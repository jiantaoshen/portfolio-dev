---
lang: en
title: "Price Watch"
description: "A local-first product price monitoring application built with React, TypeScript, ASP.NET Core, Python, and Playwright to automatically track product prices, price history, target price status, and scraper run results."
category: "Local Automation"
status: "Done"
order: 2
featured: true
featuredOrder: 2
technologies:
  - "React"
  - "TypeScript"
  - "Vite"
  - "Tailwind CSS"
  - "ASP.NET Core"
  - ".NET 10"
  - "Python"
  - "Playwright"
  - "Pydantic"
  - "Windows Task Scheduler"
highlights:
  - "Price monitoring dashboard built with React and TypeScript"
  - "ASP.NET Core providing a unified local REST API"
  - "Automated product page loading and analysis with Python and Playwright"
  - "JSON-LD as the primary price source with a conservative DOM fallback"
  - "Product management, target prices, price history, and product detail views"
  - "Detection of suspicious price changes to reduce incorrect price results"
  - "Email price notifications with duplicate alert control"
  - "Automated price checks through Windows Task Scheduler"
  - "Local JSON storage for runtime data, history, and configuration"
links:
  github: "https://github.com/jiantaoshen/PriceWatch"
draft: false
---

## Overview

Price Watch is a local-first product price monitoring system designed to automatically check product prices across different e-commerce websites. The application consists of a React and TypeScript frontend, an ASP.NET Core local API, a Python Playwright scraping service, and a local JSON data layer. Users can manage tracked products, define target prices, view current and historical prices, and run price checks manually or automatically.

## The Problem

Product pages across e-commerce websites do not follow a consistent structure. Prices may come from JSON-LD, dynamically rendered DOM elements, or other page content, while websites can also change product names, URL slugs, or page structures. Relying only on fixed CSS selectors or raw page text can result in scraping failures or incorrect prices. A complete price monitoring system must also handle historical data, abnormal price changes, scheduled execution, and notifications rather than simply performing a one-time scrape.

## Solution

The project separates the frontend, API, scraping logic, and data processing into clearly defined responsibilities. The React frontend communicates with an ASP.NET Core API to manage products, trigger scraping jobs, and retrieve historical data. Python uses Playwright to load product pages and extracts prices through an extensible scraper and strategy architecture. The system prioritizes Schema.org JSON-LD and only uses a conservative DOM fallback when structured data is unavailable. Scraping results are validated before being written to local JSON files together with historical data, run status, and notification state.

## Features

### Product Price Monitoring

Automatically visits configured product pages, extracts current prices, and compares them with target prices and historical prices.

### Multi-Strategy Price Extraction

Prioritizes Schema.org JSON-LD and uses a conservative DOM fallback when structured data is unavailable, improving compatibility across different websites.

### Product Management

Allows tracked products to be added, updated, and removed through the React interface and ASP.NET Core API, with product IDs generated automatically by the backend.

### Price History

Stores scraping results as local historical data and displays price changes through the dashboard and individual product detail views.

### Target Prices

Allows a target price to be configured for each product and automatically identifies when the current price reaches the target.

### Suspicious Price Detection

Flags unusually large price changes as suspicious to reduce the risk of installment prices, shipping costs, or unrelated data being accepted as the actual product price.

### Run Status

Records the result of each scraper run and displays health status, successful results, failures, and suspicious results in the application.

### Email Notifications

Sends email notifications when configured price conditions are met and stores notification state to reduce duplicate alerts.

### Automated Scheduling

Uses Windows Task Scheduler for recurring price checks while also supporting manual execution through Run Now.

## Challenges & Decisions

### Different Website Price Structures

Different e-commerce websites use different JSON-LD formats, product identifiers, and DOM structures, so the scraper must balance compatibility with reliability.

### Avoiding Incorrect Prices

Product pages may contain original prices, installment prices, shipping costs, and prices for related products, requiring the DOM fallback to remain conservative and use contextual confidence checks.

### Product Identity Matching

Websites may change product names or URL slugs, so JSON-LD matching cannot rely only on an exact URL and must also consider stable identifiers such as productID, SKU, and MPN.

### Local Application Boundaries

The project needs to maintain clear boundaries between React, ASP.NET Core, the Python scraper, and local data files while still operating as one complete application.

## Deployment

Price Watch follows a local-first architecture. The React application is served through ASP.NET Core, the local API handles application functionality and scraper execution, the Python Playwright scraper runs in a Windows environment, and runtime and historical data are stored in local JSON files. Automated runs are managed through Windows Task Scheduler.

## Learnings

- Building a data-driven dashboard with React and TypeScript
- Designing a local REST API with ASP.NET Core
- Connecting ASP.NET Core with Python automation tasks
- Scraping dynamic web content with Playwright
- Extracting product prices from Schema.org JSON-LD
- Designing layered JSON-LD and DOM fallback scraping strategies
- Handling product identity through URLs, SKUs, MPNs, and productIDs
- Designing price validation, anomaly detection, and run status mechanisms
- Using local JSON files as a lightweight persistence layer
- Building local automation workflows with Windows Task Scheduler and PowerShell
