# ZAP Scanning Report

ZAP by [Checkmarx](https://checkmarx.com/).


## Summary of Alerts

| Risk Level | Number of Alerts |
| --- | --- |
| High | 0 |
| Medium | 4 |
| Low | 5 |
| Informational | 5 |




## Insights

| Level | Reason | Site | Description | Statistic |
| --- | --- | --- | --- | --- |
| Low | Warning |  | ZAP warnings logged - see the zap.log file for details | 2    |
| Info | Informational | https://romulus-mirauta.vercel.app | Percentage of responses with status code 2xx | 100 % |
| Info | Informational | https://romulus-mirauta.vercel.app | Percentage of endpoints with content type application/javascript | 41 % |
| Info | Informational | https://romulus-mirauta.vercel.app | Percentage of endpoints with content type application/manifest+json | 4 % |
| Info | Informational | https://romulus-mirauta.vercel.app | Percentage of endpoints with content type application/pdf | 4 % |
| Info | Informational | https://romulus-mirauta.vercel.app | Percentage of endpoints with content type application/xml | 4 % |
| Info | Informational | https://romulus-mirauta.vercel.app | Percentage of endpoints with content type image/avif | 8 % |
| Info | Informational | https://romulus-mirauta.vercel.app | Percentage of endpoints with content type image/png | 8 % |
| Info | Informational | https://romulus-mirauta.vercel.app | Percentage of endpoints with content type image/svg+xml | 4 % |
| Info | Informational | https://romulus-mirauta.vercel.app | Percentage of endpoints with content type image/vnd.microsoft.icon | 4 % |
| Info | Informational | https://romulus-mirauta.vercel.app | Percentage of endpoints with content type image/webp | 4 % |
| Info | Informational | https://romulus-mirauta.vercel.app | Percentage of endpoints with content type text/html | 8 % |
| Info | Informational | https://romulus-mirauta.vercel.app | Percentage of endpoints with content type text/plain | 4 % |
| Info | Informational | https://romulus-mirauta.vercel.app | Percentage of endpoints with content type text/x-vcard | 4 % |
| Info | Informational | https://romulus-mirauta.vercel.app | Percentage of endpoints with method GET | 100 % |
| Info | Informational | https://romulus-mirauta.vercel.app | Count of total endpoints | 24    |
| Info | Informational | https://romulus-mirauta.vercel.app | Percentage of slow responses | 19 % |







## Alerts

| Name | Risk Level | Number of Instances |
| --- | --- | --- |
| CSP: script-src unsafe-inline | Medium | 3 |
| CSP: style-src unsafe-inline | Medium | 3 |
| Cross-Domain Misconfiguration | Medium | Systemic |
| Sub Resource Integrity Attribute Missing | Medium | 3 |
| Cross-Domain JavaScript Source File Inclusion | Low | 3 |
| Cross-Origin-Embedder-Policy Header Missing or Invalid | Low | 4 |
| Cross-Origin-Opener-Policy Header Missing or Invalid | Low | 4 |
| Permissions Policy Header Not Set | Low | 1 |
| X-Content-Type-Options Header Missing | Low | 1 |
| Modern Web Application | Informational | 2 |
| Re-examine Cache-control Directives | Informational | Systemic |
| Retrieved from Cache | Informational | Systemic |
| Storable and Cacheable Content | Informational | 1 |
| Storable but Non-Cacheable Content | Informational | Systemic |




## Alert Detail



### [ CSP: script-src unsafe-inline ](https://www.zaproxy.org/docs/alerts/10055/)



##### Medium (High)

### Description

Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks. Including (but not limited to) Cross Site Scripting (XSS), and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.

* URL: https://romulus-mirauta.vercel.app
  * Node Name: `https://romulus-mirauta.vercel.app`
  * Method: `GET`
  * Parameter: `Content-Security-Policy`
  * Attack: ``
  * Evidence: `default-src 'self'; script-src 'self' 'unsafe-inline' https://gc.zgo.at; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://*.goatcounter.com; font-src 'self'; connect-src 'self' https://*.goatcounter.com; worker-src 'self' blob:; media-src 'self'; manifest-src 'self'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'none'`
  * Other Info: `script-src includes unsafe-inline.
The response contained 2 Content-Security-Policy policies (header and/or meta). They were analyzed together using browser-style intersection (a resource is allowed only if every policy allows it):
default-src 'self'; script-src 'self' 'unsafe-inline' https://gc.zgo.at; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://*.goatcounter.com; font-src 'self'; connect-src 'self' https://*.goatcounter.com; worker-src 'self' blob:; media-src 'self'; manifest-src 'self'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'none'
default-src 'self'; script-src 'self' 'unsafe-inline' https://gc.zgo.at; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://romulus-mirauta.goatcounter.com; font-src 'self'; connect-src 'self' https://romulus-mirauta.goatcounter.com; worker-src 'self' blob:; media-src 'self'; manifest-src 'self'; base-uri 'self'; object-src 'none'; form-action 'none'`
* URL: https://romulus-mirauta.vercel.app/
  * Node Name: `https://romulus-mirauta.vercel.app/`
  * Method: `GET`
  * Parameter: `Content-Security-Policy`
  * Attack: ``
  * Evidence: `default-src 'self'; script-src 'self' 'unsafe-inline' https://gc.zgo.at; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://*.goatcounter.com; font-src 'self'; connect-src 'self' https://*.goatcounter.com; worker-src 'self' blob:; media-src 'self'; manifest-src 'self'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'none'`
  * Other Info: `script-src includes unsafe-inline.
The response contained 2 Content-Security-Policy policies (header and/or meta). They were analyzed together using browser-style intersection (a resource is allowed only if every policy allows it):
default-src 'self'; script-src 'self' 'unsafe-inline' https://gc.zgo.at; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://*.goatcounter.com; font-src 'self'; connect-src 'self' https://*.goatcounter.com; worker-src 'self' blob:; media-src 'self'; manifest-src 'self'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'none'
default-src 'self'; script-src 'self' 'unsafe-inline' https://gc.zgo.at; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://romulus-mirauta.goatcounter.com; font-src 'self'; connect-src 'self' https://romulus-mirauta.goatcounter.com; worker-src 'self' blob:; media-src 'self'; manifest-src 'self'; base-uri 'self'; object-src 'none'; form-action 'none'`
* URL: https://romulus-mirauta.vercel.app/cv/
  * Node Name: `https://romulus-mirauta.vercel.app/cv/`
  * Method: `GET`
  * Parameter: `Content-Security-Policy`
  * Attack: ``
  * Evidence: `default-src 'self'; script-src 'self' 'unsafe-inline' https://gc.zgo.at; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://*.goatcounter.com; font-src 'self'; connect-src 'self' https://*.goatcounter.com; worker-src 'self' blob:; media-src 'self'; manifest-src 'self'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'none'`
  * Other Info: `script-src includes unsafe-inline.
The response contained 2 Content-Security-Policy policies (header and/or meta). They were analyzed together using browser-style intersection (a resource is allowed only if every policy allows it):
default-src 'self'; script-src 'self' 'unsafe-inline' https://gc.zgo.at; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://*.goatcounter.com; font-src 'self'; connect-src 'self' https://*.goatcounter.com; worker-src 'self' blob:; media-src 'self'; manifest-src 'self'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'none'
default-src 'self'; script-src 'self' 'unsafe-inline' https://gc.zgo.at; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://romulus-mirauta.goatcounter.com; font-src 'self'; connect-src 'self' https://romulus-mirauta.goatcounter.com; worker-src 'self' blob:; media-src 'self'; manifest-src 'self'; base-uri 'self'; object-src 'none'; form-action 'none'`


Instances: 3

### Solution

Ensure that your web server, application server, load balancer, etc. is properly configured to set the Content-Security-Policy header.

### Reference


* [ https://www.w3.org/TR/CSP/ ](https://www.w3.org/TR/CSP/)
* [ https://caniuse.com/#search=content+security+policy ](https://caniuse.com/#search=content+security+policy)
* [ https://content-security-policy.com/ ](https://content-security-policy.com/)
* [ https://github.com/HtmlUnit/htmlunit-csp ](https://github.com/HtmlUnit/htmlunit-csp)
* [ https://web.dev/articles/csp#resource-options ](https://web.dev/articles/csp#resource-options)


#### CWE Id: [ 693 ](https://cwe.mitre.org/data/definitions/693.html)


#### WASC Id: 15

#### Source ID: 3

### [ CSP: style-src unsafe-inline ](https://www.zaproxy.org/docs/alerts/10055/)



##### Medium (High)

### Description

Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks. Including (but not limited to) Cross Site Scripting (XSS), and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.

* URL: https://romulus-mirauta.vercel.app
  * Node Name: `https://romulus-mirauta.vercel.app`
  * Method: `GET`
  * Parameter: `Content-Security-Policy`
  * Attack: ``
  * Evidence: `default-src 'self'; script-src 'self' 'unsafe-inline' https://gc.zgo.at; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://*.goatcounter.com; font-src 'self'; connect-src 'self' https://*.goatcounter.com; worker-src 'self' blob:; media-src 'self'; manifest-src 'self'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'none'`
  * Other Info: `style-src includes unsafe-inline.
The response contained 2 Content-Security-Policy policies (header and/or meta). They were analyzed together using browser-style intersection (a resource is allowed only if every policy allows it):
default-src 'self'; script-src 'self' 'unsafe-inline' https://gc.zgo.at; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://*.goatcounter.com; font-src 'self'; connect-src 'self' https://*.goatcounter.com; worker-src 'self' blob:; media-src 'self'; manifest-src 'self'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'none'
default-src 'self'; script-src 'self' 'unsafe-inline' https://gc.zgo.at; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://romulus-mirauta.goatcounter.com; font-src 'self'; connect-src 'self' https://romulus-mirauta.goatcounter.com; worker-src 'self' blob:; media-src 'self'; manifest-src 'self'; base-uri 'self'; object-src 'none'; form-action 'none'`
* URL: https://romulus-mirauta.vercel.app/
  * Node Name: `https://romulus-mirauta.vercel.app/`
  * Method: `GET`
  * Parameter: `Content-Security-Policy`
  * Attack: ``
  * Evidence: `default-src 'self'; script-src 'self' 'unsafe-inline' https://gc.zgo.at; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://*.goatcounter.com; font-src 'self'; connect-src 'self' https://*.goatcounter.com; worker-src 'self' blob:; media-src 'self'; manifest-src 'self'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'none'`
  * Other Info: `style-src includes unsafe-inline.
The response contained 2 Content-Security-Policy policies (header and/or meta). They were analyzed together using browser-style intersection (a resource is allowed only if every policy allows it):
default-src 'self'; script-src 'self' 'unsafe-inline' https://gc.zgo.at; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://*.goatcounter.com; font-src 'self'; connect-src 'self' https://*.goatcounter.com; worker-src 'self' blob:; media-src 'self'; manifest-src 'self'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'none'
default-src 'self'; script-src 'self' 'unsafe-inline' https://gc.zgo.at; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://romulus-mirauta.goatcounter.com; font-src 'self'; connect-src 'self' https://romulus-mirauta.goatcounter.com; worker-src 'self' blob:; media-src 'self'; manifest-src 'self'; base-uri 'self'; object-src 'none'; form-action 'none'`
* URL: https://romulus-mirauta.vercel.app/cv/
  * Node Name: `https://romulus-mirauta.vercel.app/cv/`
  * Method: `GET`
  * Parameter: `Content-Security-Policy`
  * Attack: ``
  * Evidence: `default-src 'self'; script-src 'self' 'unsafe-inline' https://gc.zgo.at; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://*.goatcounter.com; font-src 'self'; connect-src 'self' https://*.goatcounter.com; worker-src 'self' blob:; media-src 'self'; manifest-src 'self'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'none'`
  * Other Info: `style-src includes unsafe-inline.
The response contained 2 Content-Security-Policy policies (header and/or meta). They were analyzed together using browser-style intersection (a resource is allowed only if every policy allows it):
default-src 'self'; script-src 'self' 'unsafe-inline' https://gc.zgo.at; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://*.goatcounter.com; font-src 'self'; connect-src 'self' https://*.goatcounter.com; worker-src 'self' blob:; media-src 'self'; manifest-src 'self'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'none'
default-src 'self'; script-src 'self' 'unsafe-inline' https://gc.zgo.at; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://romulus-mirauta.goatcounter.com; font-src 'self'; connect-src 'self' https://romulus-mirauta.goatcounter.com; worker-src 'self' blob:; media-src 'self'; manifest-src 'self'; base-uri 'self'; object-src 'none'; form-action 'none'`


Instances: 3

### Solution

Ensure that your web server, application server, load balancer, etc. is properly configured to set the Content-Security-Policy header.

### Reference


* [ https://www.w3.org/TR/CSP/ ](https://www.w3.org/TR/CSP/)
* [ https://caniuse.com/#search=content+security+policy ](https://caniuse.com/#search=content+security+policy)
* [ https://content-security-policy.com/ ](https://content-security-policy.com/)
* [ https://github.com/HtmlUnit/htmlunit-csp ](https://github.com/HtmlUnit/htmlunit-csp)
* [ https://web.dev/articles/csp#resource-options ](https://web.dev/articles/csp#resource-options)


#### CWE Id: [ 693 ](https://cwe.mitre.org/data/definitions/693.html)


#### WASC Id: 15

#### Source ID: 3

### [ Cross-Domain Misconfiguration ](https://www.zaproxy.org/docs/alerts/10098/)



##### Medium (Medium)

### Description

Web browser data loading may be possible, due to a Cross Origin Resource Sharing (CORS) misconfiguration on the web server.

* URL: https://romulus-mirauta.vercel.app
  * Node Name: `https://romulus-mirauta.vercel.app`
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `Access-Control-Allow-Origin: *`
  * Other Info: `The CORS misconfiguration on the web server permits cross-domain read requests from arbitrary third party domains, using unauthenticated APIs on this domain. Web browser implementations do not permit arbitrary third parties to read the response from authenticated APIs, however. This reduces the risk somewhat. This misconfiguration could be used by an attacker to access data that is available in an unauthenticated manner, but which uses some other form of security, such as IP address white-listing.`
* URL: https://romulus-mirauta.vercel.app/
  * Node Name: `https://romulus-mirauta.vercel.app/`
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `Access-Control-Allow-Origin: *`
  * Other Info: `The CORS misconfiguration on the web server permits cross-domain read requests from arbitrary third party domains, using unauthenticated APIs on this domain. Web browser implementations do not permit arbitrary third parties to read the response from authenticated APIs, however. This reduces the risk somewhat. This misconfiguration could be used by an attacker to access data that is available in an unauthenticated manner, but which uses some other form of security, such as IP address white-listing.`
* URL: https://romulus-mirauta.vercel.app/city-poster-portrait.avif
  * Node Name: `https://romulus-mirauta.vercel.app/city-poster-portrait.avif`
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `Access-Control-Allow-Origin: *`
  * Other Info: `The CORS misconfiguration on the web server permits cross-domain read requests from arbitrary third party domains, using unauthenticated APIs on this domain. Web browser implementations do not permit arbitrary third parties to read the response from authenticated APIs, however. This reduces the risk somewhat. This misconfiguration could be used by an attacker to access data that is available in an unauthenticated manner, but which uses some other form of security, such as IP address white-listing.`
* URL: https://romulus-mirauta.vercel.app/robots.txt
  * Node Name: `https://romulus-mirauta.vercel.app/robots.txt`
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `Access-Control-Allow-Origin: *`
  * Other Info: `The CORS misconfiguration on the web server permits cross-domain read requests from arbitrary third party domains, using unauthenticated APIs on this domain. Web browser implementations do not permit arbitrary third parties to read the response from authenticated APIs, however. This reduces the risk somewhat. This misconfiguration could be used by an attacker to access data that is available in an unauthenticated manner, but which uses some other form of security, such as IP address white-listing.`
* URL: https://romulus-mirauta.vercel.app/sitemap.xml
  * Node Name: `https://romulus-mirauta.vercel.app/sitemap.xml`
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `Access-Control-Allow-Origin: *`
  * Other Info: `The CORS misconfiguration on the web server permits cross-domain read requests from arbitrary third party domains, using unauthenticated APIs on this domain. Web browser implementations do not permit arbitrary third parties to read the response from authenticated APIs, however. This reduces the risk somewhat. This misconfiguration could be used by an attacker to access data that is available in an unauthenticated manner, but which uses some other form of security, such as IP address white-listing.`

Instances: Systemic


### Solution

Ensure that sensitive data is not available in an unauthenticated manner (using IP address white-listing, for instance).
Configure the "Access-Control-Allow-Origin" HTTP header to a more restrictive set of domains, or remove all CORS headers entirely, to allow the web browser to enforce the Same Origin Policy (SOP) in a more restrictive manner.

### Reference


* [ https://vulncat.fortify.com/en/detail?category=HTML5&subcategory=Overly%20Permissive%20CORS%20Policy ](https://vulncat.fortify.com/en/detail?category=HTML5&subcategory=Overly%20Permissive%20CORS%20Policy)


#### CWE Id: [ 264 ](https://cwe.mitre.org/data/definitions/264.html)


#### WASC Id: 14

#### Source ID: 3

### [ Sub Resource Integrity Attribute Missing ](https://www.zaproxy.org/docs/alerts/90003/)



##### Medium (High)

### Description

The integrity attribute is missing on a script or link tag served by an external server. The integrity tag prevents an attacker who have gained access to this server from injecting a malicious content.

* URL: https://romulus-mirauta.vercel.app
  * Node Name: `https://romulus-mirauta.vercel.app`
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `<script defer="" src="https://gc.zgo.at/count.js" data-goatcounter="https://romulus-mirauta.goatcounter.com/count" data-goatcounter-settings="{&quot;no_onload&quot;:true}"></script>`
  * Other Info: ``
* URL: https://romulus-mirauta.vercel.app/
  * Node Name: `https://romulus-mirauta.vercel.app/`
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `<script defer="" src="https://gc.zgo.at/count.js" data-goatcounter="https://romulus-mirauta.goatcounter.com/count" data-goatcounter-settings="{&quot;no_onload&quot;:true}"></script>`
  * Other Info: ``
* URL: https://romulus-mirauta.vercel.app/cv/
  * Node Name: `https://romulus-mirauta.vercel.app/cv/`
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `<script defer="" src="https://gc.zgo.at/count.js" data-goatcounter="https://romulus-mirauta.goatcounter.com/count" data-goatcounter-settings="{&quot;no_onload&quot;:true}"></script>`
  * Other Info: ``


Instances: 3

### Solution

Provide a valid integrity attribute to the tag.

### Reference


* [ https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Subresource_Integrity ](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Subresource_Integrity)


#### CWE Id: [ 345 ](https://cwe.mitre.org/data/definitions/345.html)


#### WASC Id: 15

#### Source ID: 3

### [ Cross-Domain JavaScript Source File Inclusion ](https://www.zaproxy.org/docs/alerts/10017/)



##### Low (Medium)

### Description

The page includes one or more script files from a third-party domain.

* URL: https://romulus-mirauta.vercel.app
  * Node Name: `https://romulus-mirauta.vercel.app`
  * Method: `GET`
  * Parameter: `https://gc.zgo.at/count.js`
  * Attack: ``
  * Evidence: `<script defer="" src="https://gc.zgo.at/count.js" data-goatcounter="https://romulus-mirauta.goatcounter.com/count" data-goatcounter-settings="{&quot;no_onload&quot;:true}"></script>`
  * Other Info: ``
* URL: https://romulus-mirauta.vercel.app/
  * Node Name: `https://romulus-mirauta.vercel.app/`
  * Method: `GET`
  * Parameter: `https://gc.zgo.at/count.js`
  * Attack: ``
  * Evidence: `<script defer="" src="https://gc.zgo.at/count.js" data-goatcounter="https://romulus-mirauta.goatcounter.com/count" data-goatcounter-settings="{&quot;no_onload&quot;:true}"></script>`
  * Other Info: ``
* URL: https://romulus-mirauta.vercel.app/cv/
  * Node Name: `https://romulus-mirauta.vercel.app/cv/`
  * Method: `GET`
  * Parameter: `https://gc.zgo.at/count.js`
  * Attack: ``
  * Evidence: `<script defer="" src="https://gc.zgo.at/count.js" data-goatcounter="https://romulus-mirauta.goatcounter.com/count" data-goatcounter-settings="{&quot;no_onload&quot;:true}"></script>`
  * Other Info: ``


Instances: 3

### Solution

Ensure JavaScript source files are loaded from only trusted sources, and the sources can't be controlled by end users of the application.

### Reference



#### CWE Id: [ 829 ](https://cwe.mitre.org/data/definitions/829.html)


#### WASC Id: 15

#### Source ID: 3

### [ Cross-Origin-Embedder-Policy Header Missing or Invalid ](https://www.zaproxy.org/docs/alerts/90004/)



##### Low (Medium)

### Description

Cross-Origin-Embedder-Policy header is a response header that prevents a document from loading any cross-origin resources that don't explicitly grant the document permission (using CORP or CORS).

* URL: https://romulus-mirauta.vercel.app
  * Node Name: `https://romulus-mirauta.vercel.app`
  * Method: `GET`
  * Parameter: `Cross-Origin-Embedder-Policy`
  * Attack: ``
  * Evidence: ``
  * Other Info: ``
* URL: https://romulus-mirauta.vercel.app/
  * Node Name: `https://romulus-mirauta.vercel.app/`
  * Method: `GET`
  * Parameter: `Cross-Origin-Embedder-Policy`
  * Attack: ``
  * Evidence: ``
  * Other Info: ``
* URL: https://romulus-mirauta.vercel.app/cv/
  * Node Name: `https://romulus-mirauta.vercel.app/cv/`
  * Method: `GET`
  * Parameter: `Cross-Origin-Embedder-Policy`
  * Attack: ``
  * Evidence: ``
  * Other Info: ``
* URL: https://romulus-mirauta.vercel.app/sitemap.xml
  * Node Name: `https://romulus-mirauta.vercel.app/sitemap.xml`
  * Method: `GET`
  * Parameter: `Cross-Origin-Embedder-Policy`
  * Attack: ``
  * Evidence: ``
  * Other Info: ``


Instances: 4

### Solution

Ensure that the application/web server sets the Cross-Origin-Embedder-Policy header appropriately, and that it sets the Cross-Origin-Embedder-Policy header to 'require-corp' for documents.
If possible, ensure that the end user uses a standards-compliant and modern web browser that supports the Cross-Origin-Embedder-Policy header (https://caniuse.com/mdn-http_headers_cross-origin-embedder-policy).

### Reference


* [ https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cross-Origin-Embedder-Policy ](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cross-Origin-Embedder-Policy)


#### CWE Id: [ 693 ](https://cwe.mitre.org/data/definitions/693.html)


#### WASC Id: 14

#### Source ID: 3

### [ Cross-Origin-Opener-Policy Header Missing or Invalid ](https://www.zaproxy.org/docs/alerts/90004/)



##### Low (Medium)

### Description

Cross-Origin-Opener-Policy header is a response header that allows a site to control if others included documents share the same browsing context. Sharing the same browsing context with untrusted documents might lead to data leak.

* URL: https://romulus-mirauta.vercel.app
  * Node Name: `https://romulus-mirauta.vercel.app`
  * Method: `GET`
  * Parameter: `Cross-Origin-Opener-Policy`
  * Attack: ``
  * Evidence: ``
  * Other Info: ``
* URL: https://romulus-mirauta.vercel.app/
  * Node Name: `https://romulus-mirauta.vercel.app/`
  * Method: `GET`
  * Parameter: `Cross-Origin-Opener-Policy`
  * Attack: ``
  * Evidence: ``
  * Other Info: ``
* URL: https://romulus-mirauta.vercel.app/cv/
  * Node Name: `https://romulus-mirauta.vercel.app/cv/`
  * Method: `GET`
  * Parameter: `Cross-Origin-Opener-Policy`
  * Attack: ``
  * Evidence: ``
  * Other Info: ``
* URL: https://romulus-mirauta.vercel.app/sitemap.xml
  * Node Name: `https://romulus-mirauta.vercel.app/sitemap.xml`
  * Method: `GET`
  * Parameter: `Cross-Origin-Opener-Policy`
  * Attack: ``
  * Evidence: ``
  * Other Info: ``


Instances: 4

### Solution

Ensure that the application/web server sets the Cross-Origin-Opener-Policy header appropriately, and that it sets the Cross-Origin-Opener-Policy header to 'same-origin' for documents.
'same-origin-allow-popups' is considered as less secured and should be avoided.
If possible, ensure that the end user uses a standards-compliant and modern web browser that supports the Cross-Origin-Opener-Policy header (https://caniuse.com/mdn-http_headers_cross-origin-opener-policy).

### Reference


* [ https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cross-Origin-Opener-Policy ](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cross-Origin-Opener-Policy)


#### CWE Id: [ 693 ](https://cwe.mitre.org/data/definitions/693.html)


#### WASC Id: 14

#### Source ID: 3

### [ Permissions Policy Header Not Set ](https://www.zaproxy.org/docs/alerts/10063/)



##### Low (Medium)

### Description

Permissions Policy Header is an added layer of security that helps to restrict from unauthorized access or usage of browser/client features by web resources. This policy ensures the user privacy by limiting or specifying the features of the browsers can be used by the web resources. Permissions Policy provides a set of standard HTTP headers that allow website owners to limit which features of browsers can be used by the page such as camera, microphone, location, full screen etc.

* URL: https://romulus-mirauta.vercel.app/_vercel/insights/script.js
  * Node Name: `https://romulus-mirauta.vercel.app/_vercel/insights/script.js`
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: ``
  * Other Info: ``


Instances: 1

### Solution

Ensure that your web server, application server, load balancer, etc. is configured to set the Permissions-Policy header.

### Reference


* [ https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Permissions-Policy ](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Permissions-Policy)
* [ https://developer.chrome.com/blog/feature-policy/ ](https://developer.chrome.com/blog/feature-policy/)
* [ https://scotthelme.co.uk/a-new-security-header-feature-policy/ ](https://scotthelme.co.uk/a-new-security-header-feature-policy/)
* [ https://w3c.github.io/webappsec-feature-policy/ ](https://w3c.github.io/webappsec-feature-policy/)
* [ https://www.smashingmagazine.com/2018/12/feature-policy/ ](https://www.smashingmagazine.com/2018/12/feature-policy/)


#### CWE Id: [ 693 ](https://cwe.mitre.org/data/definitions/693.html)


#### WASC Id: 15

#### Source ID: 3

### [ X-Content-Type-Options Header Missing ](https://www.zaproxy.org/docs/alerts/10021/)



##### Low (Medium)

### Description

The Anti-MIME-Sniffing header X-Content-Type-Options was not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type. Current (early 2014) and legacy versions of Firefox will use the declared content type (if one is set), rather than performing MIME-sniffing.

* URL: https://romulus-mirauta.vercel.app/_vercel/insights/script.js
  * Node Name: `https://romulus-mirauta.vercel.app/_vercel/insights/script.js`
  * Method: `GET`
  * Parameter: `x-content-type-options`
  * Attack: ``
  * Evidence: ``
  * Other Info: `This issue still applies to error type pages (401, 403, 500, etc.) as those pages are often still affected by injection issues, in which case there is still concern for browsers sniffing pages away from their actual content type.
At "High" threshold this scan rule will not alert on client or server error responses.`


Instances: 1

### Solution

Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.
If possible, ensure that the end user uses a standards-compliant and modern web browser that does not perform MIME-sniffing at all, or that can be directed by the web application/web server to not perform MIME-sniffing.

### Reference


* [ https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85) ](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/gg622941(v=vs.85))
* [ https://owasp.org/www-community/Security_Headers ](https://owasp.org/www-community/Security_Headers)


#### CWE Id: [ 693 ](https://cwe.mitre.org/data/definitions/693.html)


#### WASC Id: 15

#### Source ID: 3

### [ Modern Web Application ](https://www.zaproxy.org/docs/alerts/10109/)



##### Informational (Medium)

### Description

The application appears to be a modern web application. If you need to explore it automatically then the Client Spider may well be more effective than the standard one.

* URL: https://romulus-mirauta.vercel.app
  * Node Name: `https://romulus-mirauta.vercel.app`
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `<noscript><section class="ygtovq_noscript" aria-label="JavaScript required"><p>This interactive page needs JavaScript. <a href="/cv/">Open the plain CV page</a> instead.</p></section></noscript>`
  * Other Info: `A noScript tag has been found, which is an indication that the application works differently with JavaScript enabled compared to when it is not.`
* URL: https://romulus-mirauta.vercel.app/
  * Node Name: `https://romulus-mirauta.vercel.app/`
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `<noscript><section class="ygtovq_noscript" aria-label="JavaScript required"><p>This interactive page needs JavaScript. <a href="/cv/">Open the plain CV page</a> instead.</p></section></noscript>`
  * Other Info: `A noScript tag has been found, which is an indication that the application works differently with JavaScript enabled compared to when it is not.`


Instances: 2

### Solution

This is an informational alert and so no changes are required.

### Reference




#### Source ID: 3

### [ Re-examine Cache-control Directives ](https://www.zaproxy.org/docs/alerts/10015/)



##### Informational (Low)

### Description

The cache-control header has not been set properly or is missing, allowing the browser and proxies to cache content. For static assets like css, js, or image files this might be intended, however, the resources should be reviewed to ensure that no sensitive content will be cached.

* URL: https://romulus-mirauta.vercel.app
  * Node Name: `https://romulus-mirauta.vercel.app`
  * Method: `GET`
  * Parameter: `cache-control`
  * Attack: ``
  * Evidence: `public, max-age=0, must-revalidate`
  * Other Info: ``
* URL: https://romulus-mirauta.vercel.app/
  * Node Name: `https://romulus-mirauta.vercel.app/`
  * Method: `GET`
  * Parameter: `cache-control`
  * Attack: ``
  * Evidence: `public, max-age=0, must-revalidate`
  * Other Info: ``
* URL: https://romulus-mirauta.vercel.app/manifest.webmanifest
  * Node Name: `https://romulus-mirauta.vercel.app/manifest.webmanifest`
  * Method: `GET`
  * Parameter: `cache-control`
  * Attack: ``
  * Evidence: `public, max-age=0, must-revalidate`
  * Other Info: ``
* URL: https://romulus-mirauta.vercel.app/robots.txt
  * Node Name: `https://romulus-mirauta.vercel.app/robots.txt`
  * Method: `GET`
  * Parameter: `cache-control`
  * Attack: ``
  * Evidence: `public, max-age=0, must-revalidate`
  * Other Info: ``
* URL: https://romulus-mirauta.vercel.app/sitemap.xml
  * Node Name: `https://romulus-mirauta.vercel.app/sitemap.xml`
  * Method: `GET`
  * Parameter: `cache-control`
  * Attack: ``
  * Evidence: `public, max-age=0, must-revalidate`
  * Other Info: ``

Instances: Systemic


### Solution

For secure content, ensure the cache-control HTTP header is set with "no-cache, no-store, must-revalidate". If an asset should be cached consider setting the directives "public, max-age, immutable".

### Reference


* [ https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#web-content-caching ](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#web-content-caching)
* [ https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control ](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control)
* [ https://grayduck.mn/2021/09/13/cache-control-recommendations/ ](https://grayduck.mn/2021/09/13/cache-control-recommendations/)


#### CWE Id: [ 525 ](https://cwe.mitre.org/data/definitions/525.html)


#### WASC Id: 13

#### Source ID: 3

### [ Retrieved from Cache ](https://www.zaproxy.org/docs/alerts/10050/)



##### Informational (Medium)

### Description

The content was retrieved from a shared cache. If the response data is sensitive, personal or user-specific, this may result in sensitive information being leaked. In some cases, this may even result in a user gaining complete control of the session of another user, depending on the configuration of the caching components in use in their environment. This is primarily an issue where caching servers such as "proxy" caches are configured on the local network. This configuration is typically found in corporate or educational environments, for instance.

* URL: https://romulus-mirauta.vercel.app
  * Node Name: `https://romulus-mirauta.vercel.app`
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `Age: 141099`
  * Other Info: `The presence of the 'Age' header indicates that a HTTP/1.1 compliant caching server is in use.`
* URL: https://romulus-mirauta.vercel.app/
  * Node Name: `https://romulus-mirauta.vercel.app/`
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `Age: 141100`
  * Other Info: `The presence of the 'Age' header indicates that a HTTP/1.1 compliant caching server is in use.`
* URL: https://romulus-mirauta.vercel.app/city-poster-portrait.avif
  * Node Name: `https://romulus-mirauta.vercel.app/city-poster-portrait.avif`
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `Age: 209970`
  * Other Info: `The presence of the 'Age' header indicates that a HTTP/1.1 compliant caching server is in use.`
* URL: https://romulus-mirauta.vercel.app/robots.txt
  * Node Name: `https://romulus-mirauta.vercel.app/robots.txt`
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `Age: 169104`
  * Other Info: `The presence of the 'Age' header indicates that a HTTP/1.1 compliant caching server is in use.`
* URL: https://romulus-mirauta.vercel.app/sitemap.xml
  * Node Name: `https://romulus-mirauta.vercel.app/sitemap.xml`
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `Age: 220480`
  * Other Info: `The presence of the 'Age' header indicates that a HTTP/1.1 compliant caching server is in use.`

Instances: Systemic


### Solution

Validate that the response does not contain sensitive, personal or user-specific information. If it does, consider the use of the following HTTP response headers, to limit, or prevent the content being stored and retrieved from the cache by another user:
Cache-Control: no-cache, no-store, must-revalidate, private
Pragma: no-cache
Expires: 0
This configuration directs both HTTP 1.0 and HTTP 1.1 compliant caching servers to not store the response, and to not retrieve the response (without validation) from the cache, in response to a similar request.

### Reference


* [ https://datatracker.ietf.org/doc/html/rfc7234 ](https://datatracker.ietf.org/doc/html/rfc7234)
* [ https://datatracker.ietf.org/doc/html/rfc7231 ](https://datatracker.ietf.org/doc/html/rfc7231)
* [ https://www.rfc-editor.org/rfc/rfc9110.html ](https://www.rfc-editor.org/rfc/rfc9110.html)


#### CWE Id: [ 525 ](https://cwe.mitre.org/data/definitions/525.html)


#### Source ID: 3

### [ Storable and Cacheable Content ](https://www.zaproxy.org/docs/alerts/10049/)



##### Informational (Medium)

### Description

The response contents are storable by caching components such as proxy servers, and may be retrieved directly from the cache, rather than from the origin server by the caching servers, in response to similar requests from other users. If the response data is sensitive, personal or user-specific, this may result in sensitive information being leaked. In some cases, this may even result in a user gaining complete control of the session of another user, depending on the configuration of the caching components in use in their environment. This is primarily an issue where "shared" caching servers such as "proxy" caches are configured on the local network. This configuration is typically found in corporate or educational environments, for instance.

* URL: https://romulus-mirauta.vercel.app/_next/static/chunks/0xa--a0onjdk5.js
  * Node Name: `https://romulus-mirauta.vercel.app/_next/static/chunks/0xa--a0onjdk5.js`
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `max-age=31536000`
  * Other Info: ``


Instances: 1

### Solution

Validate that the response does not contain sensitive, personal or user-specific information. If it does, consider the use of the following HTTP response headers, to limit, or prevent the content being stored and retrieved from the cache by another user:
Cache-Control: no-cache, no-store, must-revalidate, private
Pragma: no-cache
Expires: 0
This configuration directs both HTTP 1.0 and HTTP 1.1 compliant caching servers to not store the response, and to not retrieve the response (without validation) from the cache, in response to a similar request.

### Reference


* [ https://datatracker.ietf.org/doc/html/rfc7234 ](https://datatracker.ietf.org/doc/html/rfc7234)
* [ https://datatracker.ietf.org/doc/html/rfc7231 ](https://datatracker.ietf.org/doc/html/rfc7231)
* [ https://www.w3.org/Protocols/rfc2616/rfc2616-sec13.html ](https://www.w3.org/Protocols/rfc2616/rfc2616-sec13.html)


#### CWE Id: [ 524 ](https://cwe.mitre.org/data/definitions/524.html)


#### WASC Id: 13

#### Source ID: 3

### [ Storable but Non-Cacheable Content ](https://www.zaproxy.org/docs/alerts/10049/)



##### Informational (Medium)

### Description

The response contents are storable by caching components such as proxy servers, but will not be retrieved directly from the cache, without validating the request upstream, in response to similar requests from other users.

* URL: https://romulus-mirauta.vercel.app
  * Node Name: `https://romulus-mirauta.vercel.app`
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `max-age=0`
  * Other Info: ``
* URL: https://romulus-mirauta.vercel.app/
  * Node Name: `https://romulus-mirauta.vercel.app/`
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `max-age=0`
  * Other Info: ``
* URL: https://romulus-mirauta.vercel.app/city-poster-portrait.avif
  * Node Name: `https://romulus-mirauta.vercel.app/city-poster-portrait.avif`
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `max-age=0`
  * Other Info: ``
* URL: https://romulus-mirauta.vercel.app/robots.txt
  * Node Name: `https://romulus-mirauta.vercel.app/robots.txt`
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `max-age=0`
  * Other Info: ``
* URL: https://romulus-mirauta.vercel.app/sitemap.xml
  * Node Name: `https://romulus-mirauta.vercel.app/sitemap.xml`
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `max-age=0`
  * Other Info: ``

Instances: Systemic


### Solution



### Reference


* [ https://datatracker.ietf.org/doc/html/rfc7234 ](https://datatracker.ietf.org/doc/html/rfc7234)
* [ https://datatracker.ietf.org/doc/html/rfc7231 ](https://datatracker.ietf.org/doc/html/rfc7231)
* [ https://www.w3.org/Protocols/rfc2616/rfc2616-sec13.html ](https://www.w3.org/Protocols/rfc2616/rfc2616-sec13.html)


#### CWE Id: [ 524 ](https://cwe.mitre.org/data/definitions/524.html)


#### WASC Id: 13

#### Source ID: 3


