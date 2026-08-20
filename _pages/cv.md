---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

Education
======
* Ph.D. in Mathematics, Beihang University (BUAA), September 2025 - Present
  * Institute of Artificial Intelligence; advisor: Professor Hainan Zhang
* Research focus: hallucination in large language models, reinforcement learning, and large language model interpretability
* M.S. in Mathematics, Beihang University (BUAA), September 2023 - July 2025
  * Research focus: federated splitting of large models and privacy computing
* B.S. in Information and Computing Science (Hua Luogeng Class), School of Mathematical Sciences, Dalian University of Technology (DUT), September 2019 - July 2023

Research experience
======
* September 2024 - March 2025: Federated Splitting of Large Language Models
  * Proposed collaborative KV Cache and Attention-Mask compression methods that reduced transmitted data from MB to KB scale.
  * Achieved 8x inference acceleration and reduced client memory usage by 87.9% (from 28.2 GB to 3.4 GB) on a LLaMA2-7B framework.
  * First-author manuscript: *FedSEA-LLaMA: A Secure, Efficient and Adaptive Federated Splitting Framework for Large Language Models* (AAAI-26).
* March 2024 - July 2024: Retrieval-Augmented Generation
  * Used LlamaIndex for knowledge-base embeddings and query-document similarity matching to improve model responses.
* April 2024 - July 2024: Federated Learning with Private Data
  * Contributed experiments and code for *Safely Learning with Private Data: A Federated Learning Framework for Large Language Model* (EMNLP, CCF-B).

Internship experience
======
* February 2025 - October 2025: Algorithm Intern, Baidu Search Strategy Department
  * Improved offline prior-model metrics from F1 0.726 to 0.747 and PNR 1.885 to 2.418.
  * First-author paper: *An Efficient Framework for Whole-Page Reranking via Single-Modal Supervision* (ACL Industry 2026).

Project experience
======
* June 2024 - October 2024: Federated Privacy Large Model, Microchip Research Institute
  * Implemented federated splitting for ChatGLM and LLaMA with Flower, transmitting hidden states and gradients between model segments.
  * Demonstrated comparable performance between distributed and centralized models while protecting data locality and reducing client compute requirements.
* April 2024 - June 2024: Blockchain Adaptive Optimization, Microchip Research Institute
  * Optimized blockchain batch size and block capacity with online PPO reinforcement learning under network latency.
  * Improved average blockchain TPS by 8.4%; also contributed code standardization, unit tests, and reward-function design.

Skills
======
* Python, Linux, Matlab, PyTorch, and Transformers
* Federated learning, privacy computing, and large language models
* Large language model hallucination and interpretability
* Retrieval-augmented generation with LlamaIndex
* Blockchain systems and reinforcement learning with PPO

Publications
======
  <ul>{% for post in site.publications reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>
Talks
======
  <ul>{% for post in site.talks reversed %}
    {% include archive-single-talk-cv.html  %}
  {% endfor %}</ul>
  
Teaching
======
  <ul>{% for post in site.teaching reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>
