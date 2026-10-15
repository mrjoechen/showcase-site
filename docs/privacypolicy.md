# Showcase Privacy Policy / 隐私政策

**Effective date / 生效日期:** 2026-08-23
**Last updated / 最后更新:** 2026-10-14

Showcase is a multi-platform media display application provided by Joe Chen ("Showcase", "we", "us", or "our"). This Privacy Policy explains how Showcase handles information when you use the mobile, desktop, or web versions of the application.

Showcase 是由 Joe Chen 提供的多平台媒体展示应用（以下简称“Showcase”或“本应用”）。本隐私政策说明您使用移动端、桌面端或网页端应用时，Showcase 如何处理相关信息。

## 1. Privacy at a glance / 隐私要点

- Optional usage analytics, device registration, feedback upload, and crash reporting are **off by default**. A necessary Supabase client and pseudonymous authentication session may still be initialized to retrieve protected service configuration.
- You may turn optional collection off at any time. The app then stops new optional analytics, device-detail, feedback, and crash-report transmissions while keeping the necessary Supabase configuration session available.
- AI image summaries are optional. Photos are sent only to the third-party AI service whose Base URL and API key you enter, and only after you turn the feature on. The developer runs no AI relay server and does not receive your photos or API keys.
- Face privacy protection is on by default. Face detection runs locally on your device, and photos in which a face is detected are not sent for AI summaries. Showcase does not collect or store biometric or faceprint data.
- Location is used only to show real-time weather on the photo frame screen. Showcase requests location only while the app is in use and does not use it for advertising or background tracking.
- On Android and iOS, weather uses only location supplied by the operating system after you grant permission and does **not** fall back to IP geolocation. A location is eligible only when its operating-system capture time (or the current time for a provider result without a timestamp) is less than 24 hours old, and it is never returned after permission is revoked. On desktop, Showcase does not use an external IP-geolocation provider; it may reuse an eligible timestamped local cache, otherwise location-based weather is unavailable.
- Media-source settings, credentials, and caches are primarily stored locally on your device. Connecting a source necessarily sends requests to that source or service provider.
- Showcase does not sell personal information and does not use collected data for cross-app advertising tracking.

- 可选使用统计、设备注册、反馈上传及崩溃报告**默认关闭**。为读取受保护的服务配置，应用仍可能初始化必要的 Supabase 客户端和假名化认证会话。
- 您可以随时关闭可选收集。关闭后，应用会停止新的可选统计、设备详情、反馈及崩溃数据传输，同时保留读取服务配置所需的 Supabase 会话。
- AI 图像摘要为可选功能。只有在您填写第三方 AI 服务的 Base URL 和 API Key 并开启该功能后，照片才会发送至该服务；开发者不设中转服务器，也不会接收您的照片或 API Key。
- 人脸隐私保护默认开启。人脸检测在设备本地运行，检测到人脸的照片不会被发送用于生成 AI 摘要。Showcase 不收集、不存储任何生物识别或面部特征数据。
- 位置信息仅用于在相框界面显示实时天气。Showcase 只在您使用应用期间请求位置，不会将其用于广告或后台追踪。
- Android 和 iOS 的天气功能仅在您授权后使用操作系统提供的位置，且**不会**回退到 IP 定位；仅当系统采集时间（或无时间戳的新提供者结果的当前时间）距今不足 24 小时时才可使用，撤回权限后不会返回该位置。桌面端不会使用外部 IP 定位服务，仅可能复用仍在有效期且带时间戳的本地位置缓存，否则依赖位置的天气功能不可用。
- 媒体源设置、凭据及缓存主要保存在您的设备本地。连接某一内容源时，应用必然会向该来源或服务提供商发送请求。
- Showcase 不出售个人信息，也不会将所收集的数据用于跨应用广告追踪。

## 2. Information stored on your device / 保存在设备上的信息

Showcase may store the following information locally:

- application preferences, theme, display, sorting, and playback settings;
- media-source configuration, including server addresses, collection or playlist identifiers, and credentials supplied by you;
- media URLs, metadata, thumbnails, and image caches needed for playback and performance;
- your anonymous-usage consent choice;
- a necessary pseudonymous Supabase authentication session used to retrieve protected service configuration; and
- a locally generated persistent device UUID; when anonymous usage is enabled, its association with the authenticated Supabase user identifier and a random analytics session identifier. The device UUID is uploaded only with optional collection enabled and is not an authentication credential.

Sensitive source configuration is encrypted before it is written to the application settings store where supported by the application architecture. Local caches remain until they expire, you clear them in the application, or the application/platform removes them. Some platform-protected values, such as an iOS Keychain identifier, may survive reinstallation unless they are removed by the application or operating system.

Showcase 可能在设备本地保存：

- 应用偏好、主题、展示、排序和播放设置；
- 您配置的媒体源信息，包括服务器地址、集合或歌单标识符以及凭据；
- 播放和性能所需的媒体 URL、元数据、缩略图与图片缓存；
- 您对匿名使用数据的同意选择；
- 用于读取受保护服务配置的必要假名化 Supabase 认证会话；
- 本地随机生成的持久设备 UUID；开启匿名使用数据后，保存其与已认证 Supabase 用户标识符的关联，并生成随机统计会话标识符。设备 UUID 仅在开启可选收集时上传，不是登录凭据。

对于应用架构支持的敏感媒体源配置，Showcase 会先加密再写入设置存储。本地缓存会保留至到期、由您在应用内清除，或由应用/操作系统清理。部分受平台保护的信息（例如 iOS 钥匙串中的标识符）可能在重新安装后仍然存在，直至被应用或操作系统删除。

The necessary Supabase authentication process assigns a pseudonymous user identifier and may provide Supabase with ordinary connection metadata such as IP address, request time, and request headers. While optional collection is off, Showcase uses this session only to authorize protected service-configuration requests and does not upload analytics events or device details.

必要的 Supabase 认证过程会分配假名化用户标识符，并可能使 Supabase 接收到 IP 地址、请求时间及请求头等常规连接信息。在可选收集关闭期间，Showcase 仅使用该会话授权受保护的服务配置请求，不会上传统计事件或设备详情。

## 3. Location & Weather Data / 位置与天气数据

Showcase uses location for a single purpose: to request real-time weather data, such as the temperature and current conditions, that is shown on the photo frame screen next to the clock. On Android and iOS, Showcase asks only for permission to use location while the app is in use. It does not request background location permission, does not track your location continuously in the background, and does not use location for advertising, profiling, or tracking across other companies’ apps or websites. Coordinates are sent only to the weather provider described below and are not shared with advertisers or data brokers.

Showcase 使用位置信息仅有一个目的：请求实时天气数据（例如温度和当前天气状况），并显示在相框界面的时钟旁。在 Android 和 iOS 上，Showcase 只申请“使用应用期间”的定位权限，不申请后台定位权限，不会在后台持续定位，也不会将位置用于广告、用户画像或跨其他公司应用、网站的追踪。经纬度仅会发送给下文所述的天气服务商，不会提供给广告商或数据经纪商。

Weather is optional. On Android and iOS, Showcase asks the operating system for location permission. When permission has been granted and a native location is available, latitude and longitude and their capture time are stored in a local persistent cache and sent to [Open-Meteo](https://open-meteo.com/) to obtain current weather conditions. While permission remains granted, Showcase may reuse that location if the native provider is temporarily unavailable and fewer than 24 hours have elapsed since capture. Permission is checked again after each suspended native or cache operation; if permission is denied, restricted, or revoked, location-based weather is unavailable and neither a newly obtained nor cached location is returned. The mobile applications do not fall back to IP geolocation.

An older cache record without a capture time is not used because its age cannot be established; Showcase attempts to delete that legacy record instead of making it appear newly captured. An expired record is not used for weather fallback, although the stored record may remain until it is overwritten, application data is cleared, the application is uninstalled, or the platform removes it.

On desktop, Showcase does not request a location from an IP-geolocation service or another external location provider. It may reuse an existing timestamped local location cache only while that cache is eligible under the same 24-hour rule; an older cache without a capture time is not used. Otherwise, weather that requires a location is unavailable. Any resulting coordinates are sent only to Open-Meteo for weather data. Showcase does not send its Supabase anonymous user ID or analytics device ID to Open-Meteo and does not upload location to its Supabase analytics database.

天气功能为可选功能。在 Android 和 iOS 上，Showcase 会向操作系统申请定位权限。在您已授权且系统可以取得原生位置时，应用会将经纬度及采集时间保存在本地持久缓存中，并发送给 [Open-Meteo](https://open-meteo.com/) 以获取当前天气。在权限仍有效、原生位置暂时不可用且距离采集时间不足 24 小时时，Showcase 可能继续使用该缓存。每次可能挂起的原生定位或缓存操作结束后，应用都会再次检查权限；如果权限被拒绝、受限或撤回，依赖位置的天气功能将不可用，应用不会返回刚取得的位置或缓存位置。移动端不会回退到 IP 定位。

对于没有采集时间的旧版缓存，由于无法确定其年龄，应用不会使用，并会尝试删除，而不会把读取时间当作新的采集时间。过期缓存不会再用于天气回退，但其存储记录可能保留至被新结果覆盖、应用数据被清除、应用被卸载，或平台将其移除。

在桌面端，Showcase 不会向 IP 定位服务或其他外部定位服务商请求位置；仅当带时间戳的本地位置缓存仍符合上述 24 小时有效期时，应用才可能继续使用该缓存，没有采集时间的旧缓存不会被使用。否则，依赖位置的天气功能不可用。所得经纬度仅会发送给 Open-Meteo 获取天气。Showcase 不会向 Open-Meteo 发送 Supabase 匿名用户 ID 或统计设备 ID，也不会将位置上传至 Supabase 统计数据库。

## 4. AI Image Summaries / AI 图像摘要

AI image summaries are optional and do nothing until you set them up. Showcase has no built-in AI service, and the developer does not operate any relay or proxy server for AI requests.

- **When photos are sent.** A photo is sent for inference only after you add a third-party AI service in Showcase by entering its Base URL and your own API key, and turn on AI image summaries for a display style (Slide, Fade, or Calendar). On iOS, Showcase also asks for your consent before it sends the first photo to each service host. Requests go directly from your device to the endpoint you entered, for example OpenAI, Google Gemini, DeepSeek, or a compatible service you specify.
- **What is sent.** For each summary, Showcase sends a re-encoded copy of the photo currently on screen, scaled down to at most 768 pixels on its longest side and without the original file’s embedded metadata (such as EXIF or GPS data), together with the requested output language. Your API key is sent to that service to authenticate the request.
- **Face check first.** While face privacy protection is on (the default), each photo is checked on your device before it can be sent. See section 5.
- **What the developer does not collect.** The developer does not receive, collect, or store your photos, the summaries generated from them, or your API keys. Your API key is stored encrypted on your device, and generated summaries are stored on your device. If you turn on iCloud sync on an Apple device, your AI service settings, including the API key, sync through your own iCloud account with Apple, not through servers operated by the developer.
- **AI styles.** If you use AI style generation, the photo you choose is sent to the image-generation service you configured when you tap “Generate with AI”. Face privacy protection does not block this action; when a face is detected, Showcase shows a notice instead. The generated image is saved on your device.
- **The provider’s own policy.** The AI service you configure receives the photo, your API key, your IP address, and ordinary request metadata, and processes them under its own terms and privacy policy, including its own retention and model-training practices. Showcase does not control that processing; review the provider’s policy before you turn the feature on.
- **Stopping.** You can turn off AI image summaries or remove an AI service at any time. Photos already sent are subject to that provider’s retention policy.

AI 图像摘要为可选功能，在您完成配置前不会运行。Showcase 不内置任何 AI 服务，开发者也不运营任何用于转发 AI 请求的中转或代理服务器。

- **何时发送照片：** 只有当您在 Showcase 中添加第三方 AI 服务（填写其 Base URL 和您自己的 API Key），并为某一展示方式（幻灯片、淡入淡出或日历）开启 AI 图像摘要后，照片才会被发送进行推理。在 iOS 上，Showcase 还会在首次向每个服务主机发送照片前征求您的同意。请求由您的设备直接发送至您填写的服务地址，例如 OpenAI、Google Gemini、DeepSeek 或您指定的兼容服务。
- **发送哪些内容：** 每次生成摘要时，Showcase 会发送当前显示照片的重新编码副本：最长边缩小至不超过 768 像素，且不包含原文件内嵌的元数据（如 EXIF 或 GPS 信息），同时附带所需的输出语言。您的 API Key 会发送给该服务，用于验证请求。
- **先进行人脸检查：** 在人脸隐私保护开启期间（默认开启），每张照片在可被发送前都会先在设备本地完成检查，详见第 5 节。
- **开发者不收集的内容：** 开发者不会接收、收集或存储您的照片、由照片生成的摘要或您的 API Key。API Key 会加密保存在您的设备上，生成的摘要也保存在您的设备上。如果您在 Apple 设备上开启 iCloud 同步，包括 API Key 在内的 AI 服务配置会通过您本人的 iCloud 账户（由 Apple 提供）同步，而不会经过开发者运营的服务器。
- **AI 风格生成：** 如果您使用 AI 风格生成，在您点击“使用 AI 生成”时，您选择的照片会被发送至您配置的图像生成服务。人脸隐私保护不会阻止这一操作；检测到人脸时，Showcase 会显示提示。生成的图片保存在您的设备上。
- **服务商自身的政策：** 您配置的 AI 服务会收到照片、您的 API Key、IP 地址及常规请求元数据，并依据其自身条款和隐私政策处理，包括其数据保留及模型训练方面的做法。Showcase 无法控制这些处理行为，请在开启功能前查阅该服务商的政策。
- **停止使用：** 您可以随时关闭 AI 图像摘要或删除已添加的 AI 服务。已经发送的照片依据该服务商的保留政策处理。

## 5. On-Device Face Privacy Protection / 本地人脸隐私保护

Face privacy protection is on by default and applies to AI image summaries.

- **Runs only on your device.** Before a photo can be sent for an AI summary, Showcase checks it with the face-detection model bundled in the app’s `local-face-detection` module. Detection runs 100% on your device, in memory; during the check the photo is not written to storage or sent anywhere.
- **Used only to block uploads.** The check returns only whether a face is likely present. The photo is sent to your AI service only when no face is found. If a face is detected, or the check cannot run on your device, the photo is not sent and no summary is generated. Face detection is not used for any other purpose, such as sorting, tagging, analytics, or advertising.
- **No biometric data.** Showcase does not perform facial recognition or identify people. It does not extract, store, or share biometric identifiers, faceprints, face templates, or facial geometry. Intermediate detection data, such as where a face appears in the image, exists only temporarily in memory during the check and is discarded right after. The face-or-no-face result is kept in memory only while the app is running and is never saved or uploaded.
- **Limits and controls.** Automatic detection can miss faces, so a “no face” result does not guarantee that a photo contains no people. You can turn face privacy protection off in the AI service settings; while it is off, photos are sent to your configured AI service without this check. In AI style generation, Showcase runs the same local check only to show a notice; it does not block a photo you choose to send.

人脸隐私保护默认开启，适用于 AI 图像摘要。

- **仅在设备本地运行：** 照片在可被发送用于生成 AI 摘要之前，Showcase 会使用应用 `local-face-detection` 模块内置的人脸检测模型进行检查。检测 100% 在您设备的本地内存中完成；检查过程中，照片不会被写入存储，也不会被发送到任何地方。
- **仅用于阻止上传：** 检查结果只表示照片中是否可能有人脸。只有未检测到人脸时，照片才会被发送至您的 AI 服务。如果检测到人脸，或您的设备无法完成检测，照片不会被发送，也不会生成摘要。人脸检测不会用于任何其他目的，例如排序、打标签、统计分析或广告。
- **不处理生物识别数据：** Showcase 不进行人脸识别，也不识别具体人物；不会提取、存储或分享任何生物识别标识符、面部特征（Faceprint）、人脸模板或面部几何数据。检测过程中的中间数据（例如人脸在图片中的位置）仅在检查期间临时存在于内存中，检查完成后立即丢弃。“是否有人脸”的结果仅在应用运行期间保存在内存中，不会被写入存储或上传。
- **局限与控制：** 自动检测可能存在漏检，“未检测到人脸”并不保证照片中没有人物。您可以在 AI 服务设置中关闭人脸隐私保护；关闭后，照片将不经此检查直接发送至您配置的 AI 服务。在 AI 风格生成中，Showcase 也会运行同样的本地检查，但仅用于显示提示，不会阻止您主动选择发送的照片。

## 6. Optional anonymous usage data / 可选匿名使用数据

When you explicitly enable “Share Usage & Crash Data,” Showcase may process the following pseudonymous information:

- the necessary Supabase anonymous user ID, a separately generated persistent device UUID bound to that user, and a random analytics session ID;
- low-entropy device model/manufacturer, operating-system name/version/API level, locale language, CPU architecture, application version/build/namespace, and build type;
- feature interactions, event names, event time, and event type;
- crash reports, stack traces, error logs, and performance diagnostics through Sentry.

Although this data does not require your name, phone number, or account email, persistent identifiers can distinguish one installation or anonymous account from another. We therefore describe the data as **pseudonymous**, not fully anonymous.

Purposes are limited to measuring feature use, diagnosing failures, maintaining service security, and improving reliability. We do not use this information for targeted advertising or tracking across other companies’ applications or websites.

当您明确开启“共享使用与崩溃数据”时，Showcase 可能处理以下假名化信息：

- 必要的 Supabase 匿名用户 ID、独立生成并与该用户绑定的持久设备 UUID，以及随机统计会话 ID；
- 设备型号/制造商、操作系统名称/版本/API 级别、语言、CPU 架构、应用版本/构建号/命名空间和构建类型；
- 功能交互、事件名称、事件时间和事件类型；
- 通过 Sentry 收集的崩溃报告、调用栈、错误日志及性能诊断信息。

这些信息不要求您提供姓名、电话号码或账户邮箱，但持久标识符仍可以区分不同的安装实例或匿名账户。因此，我们将其称为**假名化数据**，而不是完全匿名数据。

处理目的仅限于衡量功能使用情况、诊断故障、维护服务安全及提升可靠性。我们不会将这些信息用于定向广告或跨其他公司的应用、网站进行追踪。

### Turning collection off / 关闭数据收集

Turning “Share Usage & Crash Data” off stops future optional analytics, device registration, feedback upload, and crash-report collection from Showcase. Showcase keeps a necessary pseudonymous Supabase authentication session and client connection so that features can retrieve protected service configuration, but it does not associate that session with analytics events or upload device details while optional collection is off. Disabling collection does not automatically erase records already received by a service provider. To request deletion of previously collected Showcase-controlled Supabase records, contact us at the address below and include the anonymous identifier if it is available to you.

关闭“共享使用与崩溃数据”后，Showcase 会停止后续可选统计、设备注册、反馈上传及崩溃报告收集。为使相关功能能够读取受保护的服务配置，应用仍会保留必要的假名化 Supabase 认证会话和客户端连接；在可选收集关闭期间，该会话不会与统计事件关联，也不会用于上传设备详情。关闭收集不会自动删除服务提供商此前已经收到的记录。如需删除此前由 Showcase 控制的 Supabase 记录，请通过文末邮箱联系我们；如您能够取得匿名标识符，请一并提供。

## 7. Feedback / 反馈

If you choose to submit feedback while anonymous usage data is enabled, Showcase sends the feedback text, the optional contact email you enter, and the registered persistent device UUID to Supabase, where the server associates the record with the authenticated Supabase user ID. This information is used only to respond to the feedback, investigate the reported issue, and improve Showcase. Do not include passwords, API keys, private media URLs, or other sensitive information in feedback.

如果您在已开启匿名使用数据的情况下主动提交反馈，Showcase 会将反馈内容、您自愿填写的联系邮箱，以及已注册的持久设备 UUID 发送到 Supabase，并由服务端将记录关联到已认证的 Supabase 用户 ID。相关信息仅用于回复反馈、调查问题及改进应用。请勿在反馈中填写密码、API Key、私人媒体 URL 或其他敏感信息。

## 8. Media sources and third-party services / 媒体源与第三方服务

Showcase can connect to services selected or configured by you, including local-network servers, cloud storage, RSS feeds, GitHub/Gitee, Immich, WebDAV, S3-compatible storage, Unsplash, Pexels, TMDB, and supported music services. The exact services contacted depend on the sources you enable.

When a request is made, the relevant provider may receive your IP address, request time, request headers, API credential or access token for that provider, search or collection identifiers, and requested media identifiers. These providers process information under their own terms and privacy policies. Showcase does not control their independent logging, security, or retention practices.

Notable providers include:

- [Supabase Privacy Policy](https://supabase.com/privacy)
- [Sentry Privacy Policy](https://sentry.io/privacy/)
- [Open-Meteo Privacy Policy](https://open-meteo.com/en/terms)
- [Unsplash Privacy Policy](https://unsplash.com/privacy)
- [Pexels Privacy Policy](https://www.pexels.com/privacy-policy/)
- [TMDB Privacy Policy](https://www.themoviedb.org/privacy-policy)

Showcase 可以连接由您选择或配置的服务，包括局域网服务器、云存储、RSS、GitHub/Gitee、Immich、WebDAV、兼容 S3 的存储、Unsplash、Pexels、TMDB 以及受支持的音乐服务。实际访问哪些服务取决于您启用的媒体源。

发送请求时，相应提供商可能接收到您的 IP 地址、请求时间、请求头、该提供商的 API 凭据或访问令牌、搜索/集合标识符以及所请求的媒体标识符。各提供商依据其自身条款和隐私政策处理信息；Showcase 无法控制其独立的日志、安全及保留策略。

## 9. Local network / 局域网

Showcase may request local-network access to discover or connect to devices and media servers that you configure, such as SMB, FTP, SFTP, WebDAV, Immich, or compatible storage services. Local-network addresses and credentials are used to establish the requested connection. Showcase does not upload your local-network credentials to its analytics database.

Showcase 可能申请局域网权限，以发现或连接您配置的设备和媒体服务器，例如 SMB、FTP、SFTP、WebDAV、Immich 或兼容存储服务。局域网地址及凭据仅用于建立您要求的连接，不会上传到 Showcase 的统计数据库。

## 10. Retention and deletion / 保留与删除

- Local settings and caches remain until you clear them, delete a source, uninstall the application, or the platform removes them.
- Supabase anonymous-account, device, analytics, and feedback records are retained while needed to operate, secure, diagnose, and improve Showcase, or until a valid deletion request is completed.
- Sentry retains diagnostic records according to the retention configured for the Showcase project and Sentry’s applicable terms.
- Third-party media, weather, and AI service providers determine retention for requests they receive under their own policies.

You may clear application caches in Settings, revoke location permission in system settings, disable anonymous usage data in Showcase, and contact us to request access to or deletion of Showcase-controlled server records. We may need the anonymous device or user identifier to locate pseudonymous records. We may retain limited records when required by law, security, fraud prevention, or dispute resolution.

- 本地设置和缓存会保留至您清除缓存、删除媒体源、卸载应用，或平台将其移除。
- Supabase 中的匿名账户、设备、统计和反馈记录，会在运营、保障安全、诊断及改进 Showcase 所需期间保留，或保留至有效删除请求处理完成。
- Sentry 诊断记录依据 Showcase 项目的保留配置及 Sentry 适用条款保存。
- 第三方媒体、天气及 AI 服务提供商依据各自政策决定其收到请求的保留期限。

您可以在设置中清除缓存、在系统设置中撤回定位权限、在 Showcase 中关闭匿名使用数据，并联系我们申请访问或删除由 Showcase 控制的服务端记录。为定位假名化记录，我们可能需要匿名设备或用户标识符。在法律、安全、防欺诈或争议处理要求下，我们可能保留有限记录。

## 11. Security / 安全

We use reasonable technical and organizational measures, including platform-protected storage where available, encrypted local source configuration, HTTPS for fixed public services, and limited-purpose credentials. No method of storage or transmission is completely secure. You are responsible for protecting credentials for media services and for using trusted local-network servers.

我们采取合理的技术与组织措施，包括在可用时使用平台保护存储、加密本地媒体源配置、固定公共服务使用 HTTPS，以及限制凭据用途。但任何存储或传输方式都无法保证绝对安全。您有责任保护媒体服务凭据，并仅连接可信的局域网服务器。

## 12. Children / 儿童隐私

Showcase is not directed to children under 13, or the higher minimum age required by applicable law. We do not knowingly request a child’s name, contact details, or account information. If you believe a child has provided personal information through feedback or diagnostics, contact us so that we can investigate and delete it where required.

Showcase 并非面向 13 岁以下儿童，或适用法律规定的更高最低年龄人群。我们不会主动要求儿童提供姓名、联系方式或账户信息。如您认为儿童通过反馈或诊断功能提交了个人信息，请联系我们处理。

## 13. International processing / 跨境处理

Supabase, Sentry, Open-Meteo, media providers, and AI services you configure may process requests in countries or regions different from yours. By enabling an optional service or configuring a remote source, information may be transferred according to that provider’s infrastructure and legal terms. Mandatory rights under your local data-protection and consumer laws continue to apply.

Supabase、Sentry、Open-Meteo、媒体提供商及您配置的 AI 服务可能在您所在国家或地区以外处理请求。启用可选服务或配置远程媒体源后，信息可能依据该提供商的基础设施与法律条款进行跨境传输。您依据当地数据保护及消费者法律享有的强制性权利不受影响。

## 14. Changes / 政策变更

We may update this policy when features, providers, or legal requirements change. The current version and effective date will be published at the policy URL and made accessible from Showcase. Material changes will be highlighted in the application or release notes where appropriate.

当功能、提供商或法律要求发生变化时，我们可能更新本政策。当前版本及生效日期会发布于隐私政策页面，并可从 Showcase 内访问；重大变化将在适当情况下通过应用或发行说明提示。

## 15. Contact / 联系我们

For privacy questions, data-access requests, or deletion requests, contact:

如有隐私问题，或需要申请访问、删除数据，请联系：

**Joe Chen**

**Email:** [mrjctech@gmail.com](mailto:mrjctech@gmail.com)
