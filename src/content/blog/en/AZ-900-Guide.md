---
lang: en
title: "AZ-900 exam guide"
description: "The knowledge you need to know for take a AZ-900 exam. Still working in process."
date: 2026-09-08
readingTime: "7 min"
tags:
  - "Microsoft Azure"
  - "AZ-900 Exam"
  - "Working in process" 
draft: false
---

## Microsoft AZ-900 Exam
The AZ-900 exam, also known as Microsoft Azure Fundamentals, is designed to validate foundational knowledge of cloud concepts, Azure architecture and services, and Azure management and governance. The core of this blog is to explain the knowledge needed to pass the exam in a simple way.

### Reference
Microsoft, “Study guide for Exam AZ-900: Microsoft Azure Fundamentals”, learn.microsoft.com. https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-900 (accessed Sept. 08, 2026).

Microsoft, “Microsoft Certified: Azure Fundamentals”, learn.microsoft.com. https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/?practice-assessment-type=certification (accessed Sept. 08, 2026).

## Cloud concepts
Cloud, or cloud computing, is basically renting computing resources over the internet instead of owning and maintaining the hardware yourself. In this way, you can run your website or application without having to buy and maintain your own hardware. Some of the best-known cloud service providers are Microsoft, Amazon, and Google. Microsoft’s cloud computing platform is called Microsoft Azure.

The benefits of cloud services are high availability, scalability, reliability, predicatability, security governance and manageability. 

### High Availability
In cloud computing, availability refers to the amount of time an application is available and accessible. **High availability means that your application remains online almost all the time.** Cloud providers use redundant infrastructure to keep applications running even when failures occur. If one server or resource fails, the system can fail over to another healthy resource to minimize application downtime.

> Failover is the process of automatically and quickly switching workloads from a failed or unavailable component to a healthy backup resource.

A Service Level Agreement (SLA) is a cloud provider’s commitment to the uptime and performance of its cloud services. A standard SLA is often 99.9%, which means the service may experience about 43 minutes of downtime per month. Higher SLA levels, such as 99.99% or 99.999%, are also available for services that require greater availability.

Business Continuity and Disaster Recovery (BCDR) helps organizations keep their business running and recover applications and data after major failures or disasters. However, BCDR is not enabled automatically—you need to plan and configure the appropriate services yourself. 

### Scalability
One of the great things about using cloud services is that you only pay for what you actually use. Also, because cloud providers operate datacenters around the world, you can deploy applications closer to your users to improve performance. You can also adjust resources such as CPU cores, RAM, GPU capacity, storage capacity, and more depending on your workload. We call this adjustment **scaling**.

> **Vertical Scaling (Scale Up/Down):** Increasing or decreasing the resources of a virtual machine, such as CPU and RAM.

> **Horizontal Scaling (Scale Out/In):** Adding or removing virtual machines based on workload demands.

Most cloud services support **autoscaling**. This helps ensure high **availability** and **resilience**, allowing your applications to remain responsive during workload fluctuations while reducing costs during periods of low traffic.

### Reliability
Reliability is the ability of a system to continue operating and recover from failures. High availability is one part of reliability, focused specifically on minimizing downtime. To achieve high reliability, you need to design and configure your cloud architecture appropriately. 

Service level objectives (SLOs) are the availability and performance targets you set for your application based on your needs.



### Reference
J. Lee, Azure Fundamentals (AZ-900) Study Guide: In-Depth Guidance and Practice for Aspiring Cloud Engineers. O’Reilly Media, 2026.

L. Klint, Microsoft Azure in action. Simon and Schuster, 2025.

## Azure architecture and services


### Reference
J. Lee, Azure Fundamentals (AZ-900) Study Guide: In-Depth Guidance and Practice for Aspiring Cloud Engineers. O’Reilly Media, 2026.

L. Klint, Microsoft Azure in action. Simon and Schuster, 2025.


## Azure management and governance

### Reference
J. Lee, Azure Fundamentals (AZ-900) Study Guide: In-Depth Guidance and Practice for Aspiring Cloud Engineers. O’Reilly Media, 2026.

L. Klint, Microsoft Azure in action. Simon and Schuster, 2025.