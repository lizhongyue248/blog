package wiki.zyue.repository

import org.jetbrains.exposed.dao.LongEntity
import org.jetbrains.exposed.dao.LongEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.LongIdTable

/**
 * @date 2021/6/11 23:59:43
 * @author echo
 */
object PageView : LongIdTable() {
  val name = varchar("name", 255)
  val path = varchar("path", 255)
  val title = varchar("title", 255)
  val count = integer("count")
  val favorite = integer("favorite")
  val hate = integer("hate")
}


class PageViewRepository(id: EntityID<Long>) : LongEntity(id) {
  companion object : LongEntityClass<PageViewRepository>(PageView)

  var name by PageView.name
  var path by PageView.path
  var title by PageView.title
  var count by PageView.count
  var favorite by PageView.favorite
  var hate by PageView.hate
}