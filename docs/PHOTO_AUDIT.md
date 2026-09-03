# Photo audit, 3 September 2026

34 photos in `work-photos/`. I have looked at every one.

**They are now sorted into folders on disk**, one per likely job, split into
`roofing/` and `carpentry/`. Each folder has a `README.txt` with a blank for the
job and the town. Fill those in, in the folders or here, whichever is easier.

```
work-photos/
  roofing/
    2025-05_terrace-reroof          2   before and after, the current hero photo
    2026-06-29_slate-reroof         3   membrane, battens, slates stacked
    2026-07-07_flat-roof            2   OSB deck, new guttering
    2026-08-07_slate-and-chimney    2   part stripped, battened
    2026-08-25_battens              2   possibly the same job as above
    2026-09-01_chimney-rebuild      6   the strongest sequence in the folder
    2026-09-03_facetime-survey      3   FaceTime grabs, a roof being looked at
    _unsorted                       1   scaffold shot, job unknown
  carpentry/
    2025-02-24_interior-framing     2
    2026-05-08_fitted-joinery       3   green room, fitted counter
    2026-07-15_timber-framing       3
    2026-07-17_stud-walls-staircase 5
```

Roofing 21, carpentry 13.

**Fill in the blanks and I will label, resize and load them into the CMS.**
For each roofing group I need: what the job was, which town, and roughly when.

---

## Roofing work: usable (19 photos)

**Group 1, 13 to 15 May 2025** — `IMG_0688`, `IMG_0699`
Terrace with scaffold up and the roof stripped back, then a finished dark tiled
roof in the sun. Looks like a before and after of the same job.
`IMG_0699` is the photo currently used at the top of the home page.
- Job: ______________________  Town: ______________

**Group 2, 29 June 2026** — `IMG_3546`, `IMG_3549`, `IMG_3550`
Re-roof in progress: green breather membrane, battens, dark slates stacked ready
to lay, houses and hills behind. Strong "work in progress" shots.
- Job: ______________________  Town: ______________

**Group 3, 7 July 2026** — `IMG_3622`, `IMG_3623`
Flat roof: OSB deck, new guttering, tools out, scaffold, view over rooftops.
- Job: ______________________  Town: ______________

**Group 4, 7 August 2026** — `IMG_3909`, `IMG_3911`
Old slate roof with a chimney, part stripped and battened, blue sky.
- Job: ______________________  Town: ______________

**Group 5, 25 to 28 August 2026** — `IMG_4159`, `IMG_4178`
Yellow battens over membrane, chimney, slate. Possibly the same job as Group 4.
- Job: ______________________  Town: ______________  Same as Group 4? ______

**Group 6, 1 to 3 September 2026** — `IMG_4184`, `IMG_4191`, `IMG_4203`,
`IMG_4206`, `IMG_4207`, `81013412705__CAEF73FA`
The best sequence in the folder. A chimney being rebuilt in red brick with hands
working on it, battens going over membrane, a dormer and valley, the street
below. This is the one that would make a convincing job page.
- Job: ______________________  Town: ______________

**Unsorted** — `IMG_4148`
Scaffold up the side of a building, portrait. Which job? ______________

## Not roofing (14 photos)

These are interior carpentry, stud framing, joinery and fit-out. Good work, but
they cannot go on a roofing portfolio without confusing people about what Will
does.

- 24 Feb 2025: `IMG_0243`, `IMG_0250` — ceiling opening, stud walls
- 15 Jul 2026: `IMG_3686`, `IMG_3687`, `IMG_3688` — timber framing, joists
- 17 Jul 2026: `IMG_3697`, `IMG_3700`, `IMG_3701`, `IMG_3703`, `IMG_3705` —
  stud walls, staircase, framing
- `IMG_3083`, `IMG_3084`, `IMG_3089` — a green room with a fitted counter and a
  radiator cover. Joinery.

**Question:** does Will want to advertise carpentry as well? If so that is a
different site section and a different conversation. If not, these stay out.

## Resolved: the three that looked wrong (3 photos)

`lp_image`, `lp_image (1)`, `lp_image (2)` — a mossy slate roof with vents.

I flagged these because all three were 1920x1280 with an identical timestamp,
which a phone does not produce. **They are Will's own**: the EXIF names the same
iPhone 17 Pro as every other photo in the folder. They are FaceTime screen grabs,
which is why they are downscaled and stripped of the software and date tags that
the ordinary photos carry.

Safe to use. One practical note: at 1920x1280 they are much lower resolution than
the 5712x4284 camera originals, but the largest size the site ever serves is
1600px wide, so they are still adequate.

- Job: ______________________  Town: ______________

---

## Notes

- Most are 5712x4284 straight off the phone, 4 to 7MB each. The build resizes
  them automatically, so no manual work needed.
- 13 rely on EXIF rotation. Checked: the build handles this correctly and they
  will not appear sideways.
- `work-photos/` is deliberately not in git. Photos that go on the site belong in
  `src/uploads/`, added through the CMS.
