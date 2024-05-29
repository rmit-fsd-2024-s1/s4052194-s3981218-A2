To detect and handle inappropriate reviews, we have integrated 'bad-words' library.
It comes with pre-defined words, which can be accessed through this link https://github.com/web-mech/badwords/blob/master/lib/lang.json
In addition, we can add or remove words.

Review is considered to be inappropriate if it contains:
-   Hate speech
-   Explicit content or references
-   Unprofessional language use
-   Personal attack
-   Reviews not relavent to the product
-   Self promotion
-   Reviews that reveals privacy information
-   Promoting illegal activities

Following are few scenarios that we can point out:
-   Unprofessional language use --> 'This product is shit'
-   Personal attack --> 'Seller is a scammer'
-   Revealing privacy content --> 'My phone number 068923124'