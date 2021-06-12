package wiki.zyue.repository

import org.jetbrains.exposed.dao.LongEntity
import org.jetbrains.exposed.dao.LongEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.LongIdTable
import org.jetbrains.exposed.sql.`java-time`.datetime

/**
 * @date 2021/6/12 02:08:53
 * @author echo
 */
object Ip: LongIdTable() {
  val name = varchar("name", 255)
  val visit = datetime("visit")
}

class IpRepository(id: EntityID<Long>): LongEntity(id) {
  companion object: LongEntityClass<IpRepository>(Ip)

  var name by Ip.name
  var visit by Ip.visit
}