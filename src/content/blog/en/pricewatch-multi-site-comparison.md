---
lang: en
title: "PriceWatch: Multi-Site Price Comparison, Quantity Normalization, and Bundle Handling"
description: "How PriceWatch handles single items, multipacks, and bundles when users explicitly choose multiple shopping sites, balancing input effort, price comparability, and alert flexibility."
date: 2026-09-02
readingTime: "5 min"
tags:
  - "PriceWatch"
  - "Price Comparison"
  - "UX"
  - "Product Design"
draft: false
---

## The Problem

PriceWatch does not automatically search the web for products, nor does it decide whether products listed on different websites are the same item. Users define the product they want to monitor, including details such as name and specification, and explicitly choose one or more shopping sites. Those sites can therefore be treated as the set of offers the user wants to compare.

The real problem is that the same user-defined product may be sold in different quantities across sites. For example, one site may sell a single unit for €20 while another sells a three-pack for €45. Comparing only the displayed total price would make €20 look cheaper, even though the three-pack has a unit price of €15. PriceWatch therefore needs to make prices comparable without adding too much setup work.

Some sites may also sell bundles that include accessories, gifts, or additional products. A bundle is not fully equivalent to a normal single-item offer. Forcing it into unit-price calculations and lowest-price rankings could therefore be misleading.

## Options Considered

- **A.** Record only the current total price for every site and compare displayed prices directly, without handling different quantities or bundles.
- **B.** Let the user specify quantity for each site. PriceWatch calculates Unit Price from current price and quantity, and displays both Lowest Total Price and Lowest Unit Price. Bundles are not handled separately.
- **C.** Build on B, but exclude bundles from normal price rankings. If a bundle is something the user explicitly wants to monitor long term, it becomes a separate product watch.
- **D.** Build on B, but if the user mainly cares about the original product and only wants a notification when a bundle reaches a certain price, add a separate alert under the same watch for the bundle's total-price threshold.

## Trade-offs

**A** provides the simplest creation flow, but price comparison becomes misleading when single items and multipacks are mixed. It is therefore only suitable when all offers use the same quantity.

**B** keeps offers inside the same watch more comparable. The user only needs to provide a quantity for each site. A normal single item can use quantity = 1, while multipacks can transparently show the calculation "total price ÷ quantity = unit price." The trade-off is a small increase in setup effort. Bundles would still participate in normal rankings, however, which could be misleading.

**C** keeps bundles as separate product watches. This makes the data model and price history very clear, but requires the user to create an additional Watch.

**D** works better when the bundle is only a secondary purchase opportunity. For example, a user may primarily monitor a phone but would also buy a "phone + charger" bundle if it drops below 5000 kr. In that case, the bundle does not need a complete price-comparison history and can instead use a separate alert without affecting the original Watch's ranking.

I ultimately chose **C**. The goal of PriceWatch is to help users compare prices across websites, not to automatically decide whether products are equivalent. The value of a bundle is subjective. For example, if I already own a charger, the charger in a phone-and-charger bundle may have effectively zero value to me. Another user who needs a charger may value the exact same bundle differently. Treating bundles as separate product watches keeps the data model and price history clear while allowing users to decide for themselves whether a bundle is worth monitoring.

## Potential Risks

- Users may enter the wrong quantity. For example, a site may actually sell a 24-pack while the user enters 12, producing an incorrect unit price. The interface should clearly show the calculation basis and make quantity easy to edit.
- A site's selling quantity may change over time. A tracked URL could represent a 12-pack when the watch is created and later change to a 10-pack. If the stored quantity is not updated, comparisons may become inaccurate.
- Lowest unit price may cause users to overlook total spending. A 12-pack may have the lowest unit price while still requiring a much higher total payment. The interface therefore needs to show unit price, quantity, and total price together.
- Users may add different models, capacities, or versions to the same watch. PriceWatch deliberately trusts the comparison relationship defined by the user and does not need automatic product matching, but it should clearly display the user-entered product specification and site information so the user can verify the comparison.
- Requiring too many fields during watch creation may reduce completion rates. Structured information such as quantity should therefore remain simple and appear only where it is useful for price normalization.

## Success Criteria

- Users can create a watch containing multiple shopping sites in a short amount of time and understand how quantity and unit price are used in the comparison.
- When the entered prices and quantities are correct, unit price, lowest total price, and lowest unit price calculations remain 100% correct.
- The comparison page clearly displays total price, purchase quantity, and unit price together, reducing the chance that users confuse lowest unit price with lowest actual payment.
- Users can add notes to a watch based on the importance or context of bundles, helping them distinguish different products or purchase formats.
- Quantity, total price, alert conditions, and notes can be updated easily when a shopping site's selling format changes.
- The overall solution maintains a reasonable balance between simple Watch creation, accurate cross-site comparison, and flexibility across different purchase formats.
