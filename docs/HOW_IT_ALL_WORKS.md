# West Wales Roofing: how the website works

Written for Will, 4 September 2026. No technical knowledge assumed.

---

## The short version

The website costs roughly **£17 a year to run**, and all of that is the domain
name and the email mailbox. The hosting, the software that lets you edit
the site, and everything else is free.

Nothing needs a monthly subscription. Nothing will stop working if it is left
alone. Two things need renewing once a year and one password-type thing expires
in September 2027.

---

## What runs the website

Five things work together. You do not need to touch most of them.

**Spaceship** is where the domain name `west-wales-roofing.com` is registered.
Think of it as the deeds to the address. It renews once a year.

**Spacemail** is the mailbox behind `will@west-wales-roofing.com`. Same company
as Spaceship, separate small annual charge.

**Cloudflare** is where the website actually lives, and it also now controls
where the domain points. When somebody types the address, Cloudflare hands them
the pages. It is free.

**GitHub** stores the website itself: every page, every photo, and a record of
every change ever made. Free, and it means nothing can be permanently lost.

**DecapBridge** is the login for the editor. It is what lets you sign in to
change the site without needing a GitHub account of your own. Free.

**Resend** carries enquiries from the website's form to your inbox. It is the
postman for that one job and nothing else. Free at the volume a roofing firm
sends.

---

## Changing the website yourself

Go to **west-wales-roofing.com/admin** and sign in with your own email address,
`will@west-wales-roofing.com`, using the same password as your email. There is a
link at the bottom of every page, marked "Owner login".

**Jobs.** Add a new roof, upload the photos, write a few lines about what the job
involved. The most important switch is **"Show this job on the website"**: leave
it off while you are still writing, and nothing appears publicly until you turn
it on. Not even at a hidden address.

**Site details.** Your phone number, email, the areas you cover, the list of what
you do. Change it here and it changes on every page at once.

**When you press Publish**, the change is saved and the website rebuilds itself.
It takes two or three minutes to appear. If you refresh and nothing has changed,
wait a minute and try again before assuming something is broken.

**Photographs.** Upload them straight from your phone. They get resized
automatically, so a 6MB photo becomes about 100KB for visitors without you doing
anything. Photos taken on a phone carry the exact location of where they were
taken, so **the ones on the site have had that stripped out** — a customer's
address is never published.

---

## How the email works

There are two separate things here and they do not depend on each other.

**Mail to `will@west-wales-roofing.com`** goes to Spacemail, exactly as it did
before the website existed. Nothing about the website touches it. Read it however
you already do.

**Enquiries from the website's form** take a different path. Somebody fills in
the form, Cloudflare hands it to Resend, and Resend emails it to your normal
inbox. You can hit reply and it goes straight back to the customer, because their
address is set as the reply address.

They arrive from `enquiries@send.west-wales-roofing.com`, which is a sending-only
address on a separate part of the domain. Nothing arrives there and nobody should
write to it. It exists so that sending enquiries can never interfere with your
actual mailbox.

If that ever fails, the visitor is told plainly on screen and asked to ring you
instead. It will not swallow an enquiry silently.

The phone, text and WhatsApp buttons on the site do not involve email at all.
They open the customer's own phone.

---

## What it costs

| What | Who | Roughly | How often |
|---|---|---|---|
| Domain name | Spaceship | £8 | Once a year |
| Email mailbox | Spacemail | £9 | Monthly, about $0.98 |
| Website hosting | Cloudflare | Free | — |
| Storing the website | GitHub | Free | — |
| Editor login | DecapBridge | Free | — |
| Sending enquiries | Resend | Free | — |
| The editor itself | Decap CMS | Free, open source | — |
| **Total** | | **about £17 a year** | |

Prices are converted from US dollars and will move a little. The mailbox is
billed monthly at about $0.98, with the first month free. Check the actual
figures in your Spaceship account.

**Why so much is free:** Cloudflare does not charge for serving a site this size,
and the parts that could cost money only start charging at volumes far beyond
what a local roofing firm will ever see. The free allowance is 100,000 visits a
day, and photographs and pages do not count towards it at all.

**What would start costing money:** nothing you are likely to do. If the site
ever needed a proper booking system, a customer login, or thousands of visitors
an hour, that would be a conversation. Adding jobs and photos will not.

---

## Dates to watch

**September 2027.** A GitHub access token expires. When it does, the editor will
stop saving your changes, with no warning and no obvious error. It needs
regenerating before then. This is the one thing on the whole site that will
break by itself, so it is worth a calendar reminder for August 2027.

**Domain renewal, once a year.** If the domain lapses the website and the email
both stop. Make sure the card on the Spaceship account is current, and turn on
auto-renew if it is not already.

**Mailbox, billed monthly.** About $0.98 a month after the free first month.
Same account as the domain, and if the card fails your email stops.

---

## If something looks wrong

**The website is down.** Check west-wales-roofing.com on your phone using mobile
data rather than wifi. If it works there, the problem is your connection.

**A change will not appear.** Wait five minutes. The site rebuilds itself and it
is not instant.

**The editor will not let you in.** Use the password reset on the login page. If
that does not work, the token in the September 2027 note above may have expired.

**Email has stopped arriving.** That is Spacemail, not the website. Nothing on
the website can stop your email working.

**Anything else**, ask Vanessa. Everything about the site is written down, and
every change ever made is recorded, so nothing is a mystery to unpick.
