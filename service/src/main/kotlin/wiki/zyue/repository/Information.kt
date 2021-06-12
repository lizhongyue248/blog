package wiki.zyue.repository

import kotlinx.serialization.Serializable
import org.jetbrains.exposed.dao.LongEntity
import org.jetbrains.exposed.dao.LongEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.LongIdTable

/**
 * @date 2021/6/12 00:00:22
 * @author echo
 */
object Information: LongIdTable() {
  val name = varchar("name", 255)
  val value = varchar("value", 255)
  val remark = varchar("remark", 255)
}

@Serializable
data class InformationResponse(
  val id: Long,
  val name: String,
  val value: String,
  val remark: String
)

class InformationRepository(id: EntityID<Long>): LongEntity(id) {
  companion object: LongEntityClass<InformationRepository>(Information)

  var name by Information.name
  var value by Information.value
  var remark by Information.remark
}