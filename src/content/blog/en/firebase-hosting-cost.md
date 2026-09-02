---
lang: en
title: "Firebase Hosting: Free Tier, Usage-Based Billing, and Cost Risk"
description: "Notes on how I evaluated availability, usage-based billing, and the risk of unexpected charges when deploying a personal website with Firebase Hosting."
date: 2026-09-02
readingTime: "4 min"
tags:
  - "Firebase"
  - "Hosting"
  - "Deployment"
  - "Cost"
draft: false
---

## Problem

Traffic to a personal portfolio is usually low, so the Firebase Hosting free tier is generally sufficient. However, after upgrading to Blaze, usage beyond the free allowance can continue generating charges. I am less concerned about the small cost of normal traffic than about unexpected bills caused by abnormal traffic, configuration mistakes, or malicious requests, so I needed to balance availability against predictable cost.

## Options

- **A.** Stay on the Spark free plan and accept temporary unavailability if the free usage limits are reached.
- **B.** Upgrade to Blaze and monitor costs with Budget Alerts.
- **C.** Use Blaze while adding authentication, rate limiting, resource limits, and monitoring for dynamic services.
- **D.** Separate the static Portfolio from future Backend or AI services that may have higher costs by placing them in different projects.

## Trade-offs

**A** has the lowest availability ceiling, but it provides the most predictable cost. For the current static Portfolio, I would rather accept temporary unavailability in an extreme case than take on unpredictable usage-based charges.

**B** allows Hosting to continue operating beyond the free allowance, but Budget Alerts are notifications rather than hard spending limits, so they cannot fully prevent unexpected charges.

**C** is more appropriate for applications that actually require Cloud Functions, Cloud Run, databases, or AI services. A single request to a dynamic service may create network, compute, and third-party API costs, so additional application-level protections are necessary.

**D** provides stronger cost isolation by giving the public Portfolio and higher-cost backend services separate resource and budget boundaries.

For the current project, I chose to remain on Spark. The Portfolio does not currently need the capabilities that justify Blaze, so there is little value in accepting usage-based billing risk before it is necessary.

## Risks

- If the Spark free usage limits are reached, the website may temporarily become unavailable.
- If the project is upgraded to Blaze in the future, abnormal traffic may already have generated additional charges before a Budget Alert arrives, because alerts are not real-time spending caps.
- Large static assets, incorrect caching configuration, or abnormal request volume can increase data transfer.
- If Backend, Database, or AI APIs are added later, the cost risk will be significantly higher than with static Hosting alone. Billing settings should therefore be combined with authentication, rate limiting, resource limits, and monitoring.

## Success Metrics

- The Portfolio remains within the free usage range under normal traffic.
- The current deployment does not require usage-based billing for features that are not yet needed.
- If Blaze is introduced later, resource usage and cost changes can be monitored clearly, with appropriate limits around higher-cost services.
- The static Portfolio and future higher-cost Backend or AI workloads can be isolated from each other.
- The deployment approach maintains a reasonable balance between availability, maintenance complexity, and worst-case billing risk.
