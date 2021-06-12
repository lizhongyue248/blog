package wiki.zyue.plugins

import io.ktor.http.*
import io.ktor.features.*
import io.ktor.application.*
import io.ktor.locations.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.serialization.*
import kotlinx.serialization.json.Json
import wiki.zyue.handle.*

fun Application.configureRouting() {
  install(Locations) {}
  install(ContentNegotiation) {
    json(json = Json { ignoreUnknownKeys = true })
  }

  val pageViewHandle = PageViewHandle()

  routing {
    get<PageViewRequest> {
      call.respond(pageViewHandle.pageView(it))
    }

    get<PageActionRequest> {
      pageViewHandle.pageActions(it)
      call.respond(HttpStatusCode.NoContent)
    }

    get("/page/all") {
      call.respond(pageViewHandle.all())
    }

    get("/pages") {
      val names = call.parameters.getAll("names")
      if (names.isNullOrEmpty()) call.respond(HttpStatusCode.BadRequest)
      else call.respond(pageViewHandle.pages(PageViewListRequest(names)))
    }

    get("/user/view") {
      call.respond(userView(call.request.origin.remoteHost))
    }

    get("/user/ips") {
      call.respond(userIps())
    }
  }
}
