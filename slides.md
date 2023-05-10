---
# try also 'default' to start simple
theme: default
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev

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

By 钟瑞峥 林俊光

May 10, 2023

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

- Calculation of the shapley value is NP-hard in general
- The number of possible coalitions is exponential in the number of facts

<br>
<br>

### ICDT 2020

- Showed mainly lower bounds on the complexity of computing the Shapley value of facts in query answering
  - gives polynomial-time algorithm for self-join-free conjunctive queries
- Need a large number of executions of the query over database subsets
- Does not provide sufficient evidence

---

# Solution - Overview

### Two Approaches

- Exact Computation
  - Capture the dependence of query answers using boolean expressions
  - Transform it to a d-DNNF circuit form in which we devise an algorithm for computing shapley value
  - May be too costly in certain circumstances

Note: Given a d-DNNF circuit, we can compute the shapley value in polynomial time with the help of c2d and Provsql

- Inexact Computation
  - Not necessarily compute exact Shapley values, determine the order of facts according to their Shapley values
  - Faster yet inexact approach that transforms it into CNF Proxy

<!-- tsetyin? -->

---

# d-DNNF(Decomposable Deterministic Negation Normal Form)

### NNF Definition

- A formula is in NNF if negation only appears in literals

  $(A\vee B)\wedge C$

  $\neg(A\vee \neg C)$

### DNNF Definition

- A formula in NNF is in DNNF form if the decompositional property holds

$(A \wedge B) \vee (A \wedge ((\neg B \vee E)\wedge F)$

---

# d-DNNF(Decomposable Deterministic Negation Normal Form)

### d-DNNF Definition

- A DNNF is called deterministic if operands of a disjunction do not share models

  $(A \wedge B) \vee (A \wedge ((\neg B \vee E)\wedge F)$

  This is not in d-DNNF form as two disjunction operands share the model

  A = 1, B = 1, E = 1, F = 1
  <img src="Screenshot 2023-05-10 at 09.12.01.png" class="absolute top-80 left-150" width="400" height="300">

---

# Solution - Overview

**Shapley value can be computed in polynomial time whenever the query can be evaluated in polynomial time over tuple-independent probablistic databases.**

- Algortihm 1: compiling to a deterministic and decomposable circuit
- Algorithm 2: resort to CNF proxy which is fast yet inexact if timeout reaches
- Hybrid approach: Algorithm 1 + Algorithm 2
  <img src="屏幕截图 2023-05-08 183708.png" class="relative top-5 left-40" width="500" />
  <br>
  Note: For non-boolean queries, we are intereseted in the Shapley Value of the fact f for every individual tuple in the output. Therefore, the computational challenge reduces to that of the boolean queries.
  <br>

---

# Tseytin Transformation

- Knowledge Compiler usually takes boolean formulas in CNF form, and not arbitrary boolean circuits.
- Tseytin transformation is a method for converting a boolean circuit into an equisatisfiable CNF formula.
  $((p\vee q) \wedge r)\rightarrow(\neg s)$

  Consider all subformulas(excluding simple variables)
    <div>
    <div class="left-half" >

  $\neg s$

  $p \vee q$

  $(p \vee q) \wedge r$

  $((p \vee q) \wedge r) \rightarrow (\neg s)$
    </div>
    <div>

  $x_1 \leftrightarrow \neg s$

  $x_2 \leftrightarrow p \vee q$

  $x_3 \leftrightarrow x_2 \wedge r$

  $x_4 \leftrightarrow x_3 \rightarrow x_1$

  All substitutions can be transformed into CNF form
  $x_2 \leftrightarrow p \vee q$
  $\equiv (\neg x_2 \vee p \vee q)\wedge (\neg p \vee x_2) \wedge (\neg q \vee x_2)$

    </div>
    </div>
  <style>
  .left-half {
    float: left;
    width: 50%;
  }
  </style>

---

# Theoretical Analysis - Reduction

<div>
  <div class="left-half">
  <img width="300" height="300" src="屏幕截图 2023-05-09 210337.png">
  </div>
  <div>
  <img width="300" height="600"  src="屏幕截图 2023-05-09 210409.png">
  </div>
</div>
<br>
Corollary: If q is a safe UCQ then shapley(q) can be solved in polynomial time

<style>

</style>

---

# Exact Computation

Recently, research proved that when the models are given as circuits from knowledge compilation can be computed in polynomial time(SHAP scores). The same approach can be applied to the computation of Shapley value.

Lemma Given as input a d-DNNF Boolean Circuit C, and an integer k, we can compute in polynomial time the quantity $#SAT_k(C)$

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
