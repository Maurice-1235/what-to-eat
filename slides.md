---
# try also 'default' to start simple
theme: seriph
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://source.unsplash.com/collection/94734566/1920x1080
# apply any windi css classes to the current slide
class: "text-center"
# https://sli.dev/custom/highlighters.html
highlighter: shiki
# show line numbers in code blocks
lineNumbers: false
# some information about the slides, markdown enabled
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
# persist drawings in exports and build
drawings:
  persist: false
# page transition
transition: slide-left
# use UnoCSS
css: unocss
---

# Computing the Shapley Value of Facts in query Answering

SIGMOD 22 Session 22: Provenance and Uncertainty

BlaBlabla

By

May 7, 2023

---

# Presentation Overview

- **Background**
  - Introduction to Shapley Value
  - General Problems
  - Problems remained in ICDT 2020
- **Solution**
  - Overview
  - Theoretical Analysis
  - Exact Computation
  - Inexact Computation
- **Conclusion**
- **References**

  <br>
  <br>

<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>

<!--
haha
-->

## <!-- problesm that are left unsolved in icdt 2020 -->

---

# Background - Shapley Value

Shapley value is a game-theoretic notion for wealth distribution that is nowadays extensively used to explain complex data-intensive computation.

- Research show that query evaluation over relational databases fits well in this explanation paradigm.
- Airport problem
<center>
  <img src="屏幕截图 2023-05-08 211310.png" width="500" height="100">
</center>
    <style>
    h1 {
      background-color: #2B90B6;
      background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
      background-size: 100%;
      -webkit-background-clip: text;
      -moz-background-clip: text;
      -webkit-text-fill-color: transparent;
      -moz-text-fill-color: transparent;
    }
    </style>
    <!-- no practical solution to the computational challenge inherent to the computation, two effective solutions for computing -->
    <!-- sol 1. capture the dependence of query answers using boolean expressions and then transform it to a particular circuit form in which we devise an algorithm for computing sp -->
    <!-- sol2. faster yet inexact approach that transforms it into CNF and uses a herustic form to compute the sp -->

---

# Background - Problems in Calculating Shapley Value

- calculation of the shapley value is NP-hard in general
- the number of possible coalitions is exponential in the number of facts

<br>
<br>

### ICDT 2020

- showed mainly lower bounds on the complexity of computing the Shapley value of facts in query answering
  - gives polynomial-time algorithm for self-join-free conjunctive queries
- need a large number of executions of the query over database subsets
- does not provide sufficient evidence

---

# Solution - Overview

### Two Approaches

- Exact Computation
  - capture the dependence of query answers using boolean expressions
  - transform it to a d-DNNF circuit form in which we devise an algorithm for computing shapley value
    Note: given a d-DNNF circuit, we can compute the shapley value in polynomial time with the help of c2d and provsql
- Inexact Computation
  - not necessarily compute exact Shapley values, determine the order of facts according to their Shapley values
  - faster yet inexact approach that transforms it into CNF Proxy

<!-- tsetyin? -->

---

# Solution - Overview

**Shapley value can be computed in polynomial time whenever the query can be evaluated in polynomial time over tuple-independent probablistic databases.**

- Algortihm 1: compiling to a deterministic and decomposable circuit
- Algorithm 2: resort to CNF proxy which is fast yet inexact if timeout reaches
- Hybrid approach: Algorithm 1 + Algorithm 2
  <img src="屏幕截图 2023-05-08 183708.png" class="relative top-5 left-20"/>
  <br>

---

# Theoretical Analysis - Reduction

Corollary: If q is a safe UCQ then shapley(q) can be solved in polynomial time
non-boolean setting of the problem may be reduced to that of boolean queries

---

# Exact Computation

Recently, research proved that when the models are given as circuits from knowledge compilation can be computed in polynomial time(SHAP scores). The same approach can be applied to the computation of Shapley value.

---

# Inexact Computation

---

# Conclusion - Experimental Results

- knowledge compilation using the c2d compiler
- datasets
  - TPC-H (removing nested queries and queries with aggregation)
  - IMDB
- Algorithm1 yields an overall 84.43% success rate for TPC-H and 99.96% for IMDB,
- Algorithm2 is very efficient and that the ranking based on CNF proxies is very close to the ranking based on the exact Shapley value

# References

---
