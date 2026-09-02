---
lang: en
title: "Scraper Deployment: Cloud or Local Execution"
description: "Why I moved from Google Cloud Run to local execution, including the test results and trade-offs behind the deployment decision."
date: 2026-09-02
readingTime: "4 min"
tags:
  - "Deployment"
  - "Google Cloud"
  - "Automation"
  - "Windows"
draft: false
---

## The Problem

Price monitoring needs to run automatically on a schedule. I initially wanted the scraper to operate independently of my local computer, so I first considered deploying it to the cloud.

## Attempts and Results

I initially deployed the scraper using Google Cloud Run + Cloud Scheduler, with Scheduler triggering price checks at regular intervals.

The deployment itself worked correctly, but during real tests every target page failed to load.

The same scraper worked correctly from my local network. This suggested that the issue was more likely related to the runtime environment, and that some target websites may restrict traffic originating from cloud data centers.

## Options Considered

- **A.** Continue using Cloud Run and investigate other ways to address the access restrictions.
- **B.** Test other cloud runtime environments.
- **C.** Stop using cloud execution and run the scraper locally.

## Trade-offs

**A** and **B** might solve the problem, but they would require additional time investigating network environments and website restrictions. Even if the issue were solved temporarily, there would be no guarantee that the target websites would not change their restrictions again.

The goal of the project is reliable price monitoring, not solving restrictions on cloud data-center traffic, so the value of investing significant additional time in that problem was limited.

**C** provides less sophisticated infrastructure than a cloud-based solution, but it is simple and real testing showed that the local environment could reliably access the target websites.

I ultimately chose **C**.

## Potential Risks

- Scheduled tasks cannot run when the local computer is powered off, sleeping or disconnected from the network.
- The scraper's request frequency also needs to be controlled to avoid repeated requests to target websites within short periods of time.

## Success Criteria

- The scraper runs on a schedule using Windows Task Scheduler while the application still provides a manual price-check option.
- At a normal request frequency, the target pages remain accessible and the complete price-monitoring workflow can operate without requiring an additional cloud-based access solution.
