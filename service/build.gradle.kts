val ktorVersion: String by project
val kotlinVersion: String by project
val logbackVersion: String by project
val exposedVersion: String by project
val h2Version: String by project

plugins {
  application
  kotlin("jvm") version "1.5.10"
  kotlin("plugin.serialization") version "1.5.10"
}

group = "wiki.zyue"
version = "0.0.1"
application {
  mainClass.set("wiki.zyue.ApplicationKt")
}

tasks.withType<org.jetbrains.kotlin.gradle.tasks.KotlinCompile> {
  kotlinOptions.jvmTarget = JavaVersion.VERSION_11.toString()
}

repositories {
  mavenCentral()
}

dependencies {
  implementation("io.ktor:ktor-server-core:$ktorVersion")
  implementation("io.ktor:ktor-locations:$ktorVersion")
  implementation("io.ktor:ktor-server-host-common:$ktorVersion")
  implementation("io.ktor:ktor-metrics:$ktorVersion")
  implementation("io.ktor:ktor-serialization:$ktorVersion")
  implementation("io.ktor:ktor-server-netty:$ktorVersion")
  implementation("ch.qos.logback:logback-classic:$logbackVersion")
  implementation("org.jetbrains.exposed:exposed-core:$exposedVersion")
  implementation("org.jetbrains.exposed:exposed-dao:$exposedVersion")
  implementation("org.jetbrains.exposed:exposed-jdbc:$exposedVersion")
  implementation("org.jetbrains.exposed:exposed-java-time:$exposedVersion")
  implementation("org.jetbrains.kotlinx:kotlinx-datetime:0.2.1")
  implementation("com.h2database:h2:1.4.200")
  testImplementation("io.ktor:ktor-server-tests:$ktorVersion")
}