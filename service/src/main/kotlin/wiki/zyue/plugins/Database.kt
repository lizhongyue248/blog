package wiki.zyue.plugins

import io.ktor.application.*
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction
import wiki.zyue.repository.Information
import wiki.zyue.repository.Ip
import wiki.zyue.repository.PageView

/**
 * @date 2021/6/12 00:44:14
 * @author echo
 */
fun Application.configDatabase() {
  Database.connect("jdbc:h2:./zyue-wiki", "org.h2.Driver")
  transaction {
    addLogger(StdOutSqlLogger)
    addLogger(Slf4jSqlDebugLogger)
    SchemaUtils.createMissingTablesAndColumns(Information, PageView, Ip)
  }
}