package wiki.zyue.plugins

import io.ktor.http.*
import io.ktor.application.*
import io.ktor.features.*

fun Application.configureHTTP() {
  install(CORS) {
    method(HttpMethod.Options)
    method(HttpMethod.Get)
    method(HttpMethod.Post)
//    header(HttpHeaders.Authorization)
    allowCredentials = true
    if (developmentMode) {
      host("*")
    }
    host("zyue.wiki", listOf("https"))
  }

}
