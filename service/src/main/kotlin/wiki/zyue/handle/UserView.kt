package wiki.zyue.handle

import kotlinx.serialization.KSerializer
import kotlinx.serialization.Serializable
import kotlinx.serialization.Serializer
import kotlinx.serialization.descriptors.PrimitiveKind
import kotlinx.serialization.descriptors.PrimitiveSerialDescriptor
import kotlinx.serialization.descriptors.SerialDescriptor
import kotlinx.serialization.encoding.Decoder
import kotlinx.serialization.encoding.Encoder
import org.jetbrains.exposed.sql.transactions.transaction
import wiki.zyue.repository.IpRepository
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.*

@Serializer(forClass = LocalDateTime::class)
class LocalDateTimeSerializer : KSerializer<LocalDateTime> {

  override val descriptor: SerialDescriptor =
    PrimitiveSerialDescriptor("LocalDateTimeTz", PrimitiveKind.STRING)
  private val formatter: DateTimeFormatter =
    DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss").withLocale(Locale.SIMPLIFIED_CHINESE)

  override fun deserialize(decoder: Decoder): LocalDateTime =
    LocalDateTime.parse(decoder.decodeString(), formatter)

  override fun serialize(encoder: Encoder, obj: LocalDateTime) {
    encoder.encodeString(formatter.format(obj))
  }
}

/**
 * @date 2021/6/12 02:04:42
 * @author echo
 */
@Serializable
data class Ip(
  val name: String,
  @Serializable(with = LocalDateTimeSerializer::class)
  val visit: LocalDateTime
)

/**
 * (GET) /user/view
 * Get user view by [host], it will insert row.
 */
fun userView(host: String) = transaction {
  IpRepository.new {
    name = host
    visit = LocalDateTime.now()
  }
  mapOf("number" to IpRepository.all().distinctBy { ipRepository -> ipRepository.name }.count())
}

/**
 * (GET) /user/ips
 */
fun userIps() = transaction {
  IpRepository.all().sortedBy { it.visit }.ifEmpty { listOf() }.map {
    Ip(name = it.name, visit = it.visit)
  }
}