package wiki.zyue.handle

import io.ktor.locations.*
import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.and
import org.jetbrains.exposed.sql.transactions.transaction
import wiki.zyue.repository.*


enum class PageType {
  FAVORITE, HATE
}

@Location("/page/view/{name}")
data class PageViewRequest(
  val name: String,
  val title: String,
  val path: String
)

@Location("/page/action/{name}")
data class PageActionRequest(
  val name: String,
  val title: String,
  val path: String,
  val type: PageType
)

@Serializable
data class PageViewListRequest(
  val names: List<String>
)

@Serializable
data class PageViewResponse(
  val id: Long,
  val name: String,
  val title: String,
  val path: String,
  val count: Int,
  val favorite: Int,
  val hate: Int
)
/**
 * @date 2021/6/12 01:44:41
 * @author echo
 */
class PageViewHandle {
  private fun findExpression(name: String, path: String, title: String) =
    (PageView.name eq name) and
      (PageView.path eq path) and
      (PageView.title eq title)

  /**
   * (GET) /page/view/{name}
   * Get or set one [request] page view.
   * If the page doesn't have data, it will create new data and add count to 1,
   * else the count will add 1.
   */
  fun pageView(request: PageViewRequest): PageViewResponse =
    transaction {
      var pageViewRepository = PageViewRepository
        .find { findExpression(request.name, request.path, request.title) }
        .limit(1).firstOrNull()
      if (pageViewRepository === null)
        pageViewRepository = PageViewRepository.new {
          name = request.name
          path = request.path
          title = request.title
          count = 1
          favorite = 0
          hate = 0
        }
      else pageViewRepository.count += 1
      PageViewResponse(
        id = pageViewRepository.id.value,
        name = pageViewRepository.name,
        path = pageViewRepository.path,
        title = pageViewRepository.title,
        count = pageViewRepository.count,
        favorite = pageViewRepository.favorite,
        hate = pageViewRepository.hate
      )
    }

  /**
   * (GET) /page/action/{name}
   * Do action from [request].
   */
  fun pageActions(request: PageActionRequest) = transaction {
    val pageViewRepository = PageViewRepository
      .find { findExpression(request.name, request.path, request.title) }
      .limit(1).firstOrNull()
    when {
      pageViewRepository === null -> PageViewRepository.new {
        name = request.name
        path = request.path
        title = request.title
        count = 0
        favorite = if (request.type === PageType.FAVORITE) 1 else 0
        hate = if (request.type === PageType.HATE) 1 else 0
      }
      request.type === PageType.FAVORITE -> pageViewRepository.favorite += 1
      else -> pageViewRepository.hate += 1
    }
  }

  /**
   * (POST) /pages
   */
  fun pages(request: PageViewListRequest) = transaction {
    val pages = PageViewRepository
      .find { PageView.name inList request.names }
      .associateBy { it.name }
    request.names.map {
      val pageViewRepository = pages[it]
      if (pageViewRepository === null)
        PageViewResponse(
          id = 0,
          name = it,
          title = "",
          path = "",
          count = 0,
          favorite = 0,
          hate = 0
        )
      else PageViewResponse(
        id = pageViewRepository.id.value,
        name = pageViewRepository.name,
        title = pageViewRepository.title,
        path = pageViewRepository.path,
        count = pageViewRepository.count,
        favorite = pageViewRepository.favorite,
        hate = pageViewRepository.hate
      )
    }.associateBy { it.name }
  }

  /**
   * (GET) /page/all
   * Get all page view.
   */
  fun all() = transaction {
    PageViewRepository.all().sortedBy { it.count }
      .map { pageViewRepository ->
        PageViewResponse(
          id = pageViewRepository.id.value,
          name = pageViewRepository.name,
          title = pageViewRepository.title,
          path = pageViewRepository.path,
          count = pageViewRepository.count,
          favorite = pageViewRepository.favorite,
          hate = pageViewRepository.hate
        )
      }.ifEmpty { listOf() }
  }
}