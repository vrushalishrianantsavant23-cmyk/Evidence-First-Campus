# AI-use record (Task 2)

Five AI-assisted exercises, each checked by me. Model for all five: Claude Sonnet 5.5. Date for all five: 23 Oct 2026. The checking code was written with Claude's help; I ran it in Google Colab or SQLite Online and compared the results myself.

---

## Exercise 1: Computer Networks (subnetting)

**Prompt:** Split 192.168.10.0/24 into 6 subnets. Give the subnet mask, block size and usable host range of each subnet.

**Model and date:** Sonnet 5.5, 23 Oct 2026

**Claude's output:**

To get 6 subnets you need to borrow 3 bits from the host portion (2^2 = 4 is too few, 2^3 = 8 is enough).

- New prefix: /24 + 3 = /27
- Subnet mask: 255.255.255.224
- Block size: 256 - 224 = 32 addresses per subnet
- Usable hosts per subnet: 32 - 2 = 30
- Subnets created: 8 (you use 6 and leave 2 spare)

| # | Network address | Usable host range | Broadcast address |
|---|-----------------|-------------------|-------------------|
| 1 | 192.168.10.0/27 | 192.168.10.1 - 192.168.10.30 | 192.168.10.31 |
| 2 | 192.168.10.32/27 | 192.168.10.33 - 192.168.10.62 | 192.168.10.63 |
| 3 | 192.168.10.64/27 | 192.168.10.65 - 192.168.10.94 | 192.168.10.95 |
| 4 | 192.168.10.96/27 | 192.168.10.97 - 192.168.10.126 | 192.168.10.127 |
| 5 | 192.168.10.128/27 | 192.168.10.129 - 192.168.10.158 | 192.168.10.159 |
| 6 | 192.168.10.160/27 | 192.168.10.161 - 192.168.10.190 | 192.168.10.191 |

The two unused subnets are available for future growth:

| # | Network address | Usable host range | Broadcast address |
|---|-----------------|-------------------|-------------------|
| 7 | 192.168.10.192/27 | 192.168.10.193 - 192.168.10.222 | 192.168.10.223 |
| 8 | 192.168.10.224/27 | 192.168.10.225 - 192.168.10.254 | 192.168.10.255 |

All subnets share the mask 255.255.255.224, and each network address is a multiple of the block size (0, 32, 64, 96, 128, 160, ...). The first usable host is the network address + 1, and the last is the broadcast address - 1.

**How I verified:** I ran Python's `ipaddress` module in Google Colab and compared the mask, first host and last host of all 8 subnets line by line. I checked by hand that /27 is right (2^2 = 4 < 6, 2^3 = 8 >= 6).

**Checking code:**

```python
import ipaddress
net = ipaddress.ip_network("192.168.10.0/24")
for s in net.subnets(new_prefix=27):
    hosts = list(s.hosts())
    print(s, "mask", s.netmask, "first", hosts[0], "last", hosts[-1])
```

**Output from Colab:**

```text
192.168.10.0/27 mask 255.255.255.224 first 192.168.10.1 last 192.168.10.30
192.168.10.32/27 mask 255.255.255.224 first 192.168.10.33 last 192.168.10.62
192.168.10.64/27 mask 255.255.255.224 first 192.168.10.65 last 192.168.10.94
192.168.10.96/27 mask 255.255.255.224 first 192.168.10.97 last 192.168.10.126
192.168.10.128/27 mask 255.255.255.224 first 192.168.10.129 last 192.168.10.158
192.168.10.160/27 mask 255.255.255.224 first 192.168.10.161 last 192.168.10.190
192.168.10.192/27 mask 255.255.255.224 first 192.168.10.193 last 192.168.10.222
192.168.10.224/27 mask 255.255.255.224 first 192.168.10.225 last 192.168.10.254
```

**Verdict:** Correct, no changes needed.

**Limitation:** The checking code was written with Claude's help, and it assumes /27 from the start. So Python checked the subnet ranges, and I checked the choice of /27 by hand: 2^2 = 4 is less than 6 subnets, and 2^3 = 8 is enough, so 3 bits are borrowed. I tested one example only.

---

## Exercise 2: DBMS (normalization to 3NF)

**Prompt:** Normalize Orders(order_id, customer_id, customer_name, customer_city, product_id, product_name, unit_price, quantity) to 3NF. FDs: order_id->customer_id; customer_id->customer_name, customer_city; product_id->product_name, unit_price; (order_id, product_id)->quantity. Give the tables and SQLite CREATE statements.

**Model and date:** Sonnet 5.5, 23 Oct 2026

**Claude's output:**

Candidate key: {order_id, product_id}. This determines everything: order_id gives customer_id, then customer name and city; product_id gives name and price; the pair gives quantity.

Why it is not in 3NF:
- 2NF violations (partial dependencies): customer_id, customer_name and customer_city depend only on order_id, and product_name and unit_price depend only on product_id, each a proper subset of the key.
- 3NF violation (transitive dependency): order_id -> customer_id -> customer_name, customer_city.

Decomposition (3NF, and also BCNF):
- Customers(customer_id, customer_name, customer_city)
- Products(product_id, product_name, unit_price)
- Orders(order_id, customer_id), with customer_id as FK to Customers
- OrderItems(order_id, product_id, quantity), with order_id as FK to Orders and product_id as FK to Products

Every FD is preserved in exactly one table, and the decomposition is lossless.

```sql
PRAGMA foreign_keys = ON;

CREATE TABLE Customers (
    customer_id   INTEGER PRIMARY KEY,
    customer_name TEXT NOT NULL,
    customer_city TEXT
);

CREATE TABLE Products (
    product_id   INTEGER PRIMARY KEY,
    product_name TEXT NOT NULL,
    unit_price   NUMERIC NOT NULL CHECK (unit_price >= 0)
);

CREATE TABLE Orders (
    order_id    INTEGER PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

CREATE TABLE OrderItems (
    order_id   INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity   INTEGER NOT NULL CHECK (quantity > 0),
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id)   REFERENCES Orders(order_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);
```

Note: SQLite only enforces foreign keys when `PRAGMA foreign_keys = ON` is set, and it must be set on each connection.

Design caveat from Claude: since unit_price lives in Products, changing a product's price alters the apparent price on historical orders. That is correct for the given FDs, but in a real system you would often add a unit_price column to OrderItems to record the price at the time of sale (a new FD, (order_id, product_id) -> unit_price).

**How I verified:** I ran the CREATE statements in sqliteonline.com (SQLite) and listed the tables with `SELECT name FROM sqlite_master`. Four tables were created: Customers, Products, Orders, OrderItems. I checked each FD by hand against the tables (customer_name and customer_city in Customers, product_name and unit_price in Products, quantity in OrderItems with key (order_id, product_id)).

**Verdict:** Correct.

**Limitations:** The first run failed with "table Customers already exists" because I ran the script twice; I added DROP TABLE IF EXISTS lines and re-ran it. That was my mistake, not the SQL's. I did not insert test data or test the foreign keys.

---
## Exercise 3: Algorithms (Master theorem)

**Prompt:** Solve T(n)=3T(n/2)+n^2 using the Master theorem and show which case applies.

**Model and date:** Sonnet 5.5, 23 Oct 2026

**Claude's output:**

Recurrence: T(n) = 3T(n/2) + n^2

Step 1: The Master theorem applies to T(n) = aT(n/b) + f(n) with a >= 1 and b > 1. Here a = 3, b = 2, f(n) = n^2.

Step 2: Critical exponent: n^(log_b a) = n^(log2 3), which is about n^1.585.

Step 3: Compare f(n) with n^(log_b a). Since 2 > 1.585, f(n) = n^2 grows polynomially faster than n^(log2 3). Specifically, f(n) = Omega(n^(log2 3 + e)) for e = 2 - log2 3, about 0.415 > 0.

Step 4: This is Case 3 (f(n) dominates).

Step 5: Case 3 also requires a*f(n/b) <= c*f(n) for some constant c < 1. Here a*f(n/b) = 3*(n/2)^2 = (3/4)*n^2, so c = 3/4 < 1 and the regularity condition holds.

Step 6: T(n) = Theta(f(n)) = Theta(n^2).

Sanity check from Claude: unrolling the recurrence, level i has 3^i subproblems each costing (n/2^i)^2, so the cost per level is n^2 * (3/4)^i. This is a decreasing geometric series dominated by the root level, with sum n^2 / (1 - 3/4) = 4n^2, which confirms Theta(n^2).

**Checking code:**

```python
import math

def T(n):
    if n == 1:
        return 1
    return 3 * T(n // 2) + n * n

for k in range(1, 16):
    n = 2 ** k
    t = T(n)
    print(n, t, "T/n^2 =", round(t / n**2, 4), "T/n^1.585 =", round(t / n**math.log2(3), 4))
```

**Output from Colab:**

```text
2 7 T/n^2 = 1.75 T/n^1.585 = 2.3333
4 37 T/n^2 = 2.3125 T/n^1.585 = 4.1111
8 175 T/n^2 = 2.7344 T/n^1.585 = 6.4815
16 781 T/n^2 = 3.0508 T/n^1.585 = 9.642
32 3367 T/n^2 = 3.2881 T/n^1.585 = 13.856
64 14197 T/n^2 = 3.4661 T/n^1.585 = 19.4746
128 58975 T/n^2 = 3.5995 T/n^1.585 = 26.9662
256 242461 T/n^2 = 3.6997 T/n^1.585 = 36.9549
512 989527 T/n^2 = 3.7747 T/n^1.585 = 50.2732
1024 4017157 T/n^2 = 3.8311 T/n^1.585 = 68.0309
2048 16245775 T/n^2 = 3.8733 T/n^1.585 = 91.7079
4096 65514541 T/n^2 = 3.905 T/n^1.585 = 123.2772
8192 263652487 T/n^2 = 3.9287 T/n^1.585 = 165.3696
16384 1059392917 T/n^2 = 3.9465 T/n^1.585 = 221.4927
32768 4251920575 T/n^2 = 3.9599 T/n^1.585 = 296.3237
```

**How I verified:** I ran a Python recursion for T(n) with T(1)=1 in Google Colab for n = 2^1 to 2^15. T(n)/n^2 settled near 4 (3.96 at n = 32768) while T(n)/n^1.585 kept growing, which matches Theta(n^2). I also checked by hand that case 3 applies (log2(3) is about 1.585, less than 2) and that the regularity condition holds with c = 3/4.

**Verdict:** Correct.

**Limitations:** The checking code was written with Claude's help. The numeric test supports the growth rate but is not a proof. It assumes T(1)=1, which the question did not specify (it does not change the Theta result).

---

## Exercise 4: Operating Systems (SRTF and Round Robin)

**Prompt:** Processes (arrival, burst): P1(0,8), P2(1,4), P3(2,9), P4(3,5). Give the average waiting time under SRTF and under Round Robin with quantum 3.

**Model and date:** Sonnet 5.5, 23 Oct 2026

**Claude's output:**

SRTF (preemptive SJF)

Gantt chart: P1 (0-1) | P2 (1-5) | P4 (5-10) | P1 (10-17) | P3 (17-26)

| Process | Completion | Turnaround | Waiting |
|---------|-----------:|-----------:|--------:|
| P1 | 17 | 17 | 9 |
| P2 | 5 | 4 | 0 |
| P3 | 26 | 24 | 15 |
| P4 | 10 | 7 | 2 |

Average waiting time = 26 / 4 = 6.5

Round Robin (q = 3). Claude assumed that a process arriving at the same instant another is preempted joins the ready queue first. That applies to P4 and P1 at t=3.

Gantt chart: P1 (0-3) | P2 (3-6) | P3 (6-9) | P4 (9-12) | P1 (12-15) | P2 (15-16) | P3 (16-19) | P4 (19-21) | P1 (21-23) | P3 (23-26)

| Process | Completion | Turnaround | Waiting |
|---------|-----------:|-----------:|--------:|
| P1 | 23 | 23 | 15 |
| P2 | 16 | 15 | 11 |
| P3 | 26 | 24 | 15 |
| P4 | 21 | 18 | 13 |

Average waiting time = 54 / 4 = 13.5

SRTF gives 6.5 and Round Robin gives 13.5. SRTF is much lower because it always runs the shortest remaining job. Claude added that with the opposite tie-break (the preempted process goes to the queue before the new arrival) the Round Robin result may change slightly.

**Checking code:**

```python
procs = {"P1": (0, 8), "P2": (1, 4), "P3": (2, 9), "P4": (3, 5)}

def srtf(procs):
    rem = {p: b for p, (a, b) in procs.items()}
    done = {}
    t = 0
    while len(done) < len(procs):
        ready = [p for p in procs if procs[p][0] <= t and p not in done]
        if not ready:
            t += 1
            continue
        p = min(ready, key=lambda x: (rem[x], procs[x][0]))
        rem[p] -= 1
        t += 1
        if rem[p] == 0:
            done[p] = t
    return {p: done[p] - procs[p][0] - procs[p][1] for p in procs}

def rr(procs, q):
    rem = {p: b for p, (a, b) in procs.items()}
    order = sorted(procs, key=lambda x: procs[x][0])
    queue, done, t, i = [], {}, 0, 0
    while len(done) < len(procs):
        while i < len(order) and procs[order[i]][0] <= t:
            queue.append(order[i]); i += 1
        if not queue:
            t = procs[order[i]][0]
            continue
        p = queue.pop(0)
        run = min(q, rem[p])
        t += run
        rem[p] -= run
        while i < len(order) and procs[order[i]][0] <= t:
            queue.append(order[i]); i += 1
        if rem[p] == 0:
            done[p] = t
        else:
            queue.append(p)
    return {p: done[p] - procs[p][0] - procs[p][1] for p in procs}

for name, w in [("SRTF", srtf(procs)), ("RR q=3", rr(procs, 3))]:
    print(name, w, "average =", sum(w.values()) / len(w))
```

**Output from Colab:**

```text
SRTF {'P1': 9, 'P2': 0, 'P3': 15, 'P4': 2} average = 6.5
RR q=3 {'P1': 15, 'P2': 11, 'P3': 15, 'P4': 13} average = 13.5
```

**How I verified:** I ran a Python simulation in Google Colab for SRTF and Round Robin (q=3), computed waiting time as completion - arrival - burst, and compared the per-process waiting times and both averages with the answer.

**Verdict:** Correct. The SRTF average and the Round Robin average both matched.

**Limitations:** The simulation code was written with Claude's help. For Round Robin, when a process arrives at the same moment another one's quantum ends, the queue order depends on a convention; I used "new arrival goes first". Per-process waiting times can differ under the other convention. I tested only this one set of four processes.

---

## Exercise 5: Deep Learning (sigmoid neuron gradients)

**Prompt:** For one sigmoid neuron with MSE loss, x=2, w=0.5, b=0.1, y=1, derive dL/dw and dL/db and give the numbers.

**Model and date:** Sonnet 5.5, 23 Oct 2026

**Claude's output:**

Setup: z = wx + b, a = sigmoid(z), L = 1/2 (a - y)^2 (the 1/2 convention; the alternative is noted below).

Forward pass:
- z = 0.5 * 2 + 0.1 = 1.1
- a = sigmoid(1.1) = 1 / (1 + e^(-1.1)), about 0.7503
- L = 1/2 (0.7503 - 1)^2, about 1/2 (0.0624), about 0.0312

Chain rule: dL/dw = (dL/da)(da/dz)(dz/dw), where dL/da = (a - y), da/dz = a(1 - a), dz/dw = x and dz/db = 1. So:
- dL/dw = (a - y) * a(1 - a) * x
- dL/db = (a - y) * a(1 - a)

Numbers:
- a - y = 0.7503 - 1 = -0.2497
- a(1 - a) = 0.7503 * 0.2497, about 0.18736
- delta = (a - y) * a(1 - a), about -0.04678
- dL/db is about -0.0468
- dL/dw = delta * x, about -0.0936

Note from Claude: if you use L = (a - y)^2 without the 1/2, both gradients double: dL/dw is about -0.187 and dL/db is about -0.0936. Both gradients are negative, so gradient descent will increase w and b, pushing the output toward y = 1.

**Checking code:**

```python
import math

x, w, b, y = 2.0, 0.5, 0.1, 1.0

def sigmoid(z):
    return 1 / (1 + math.exp(-z))

def loss(w, b, half):
    a = sigmoid(w * x + b)
    l = (a - y) ** 2
    return 0.5 * l if half else l

eps = 1e-6
for half in (False, True):
    name = "L = 1/2 (a-y)^2" if half else "L = (a-y)^2"
    dw = (loss(w + eps, b, half) - loss(w - eps, b, half)) / (2 * eps)
    db = (loss(w, b + eps, half) - loss(w, b - eps, half)) / (2 * eps)
    print(name, "| numerical dL/dw =", round(dw, 6), "| dL/db =", round(db, 6))
```

**Output from Colab:**

```text
L = (a-y)^2 | numerical dL/dw = -0.187175 | dL/db = -0.093587
L = 1/2 (a-y)^2 | numerical dL/dw = -0.093587 | dL/db = -0.046794
```

**How I verified:** I estimated dL/dw and dL/db numerically in Google Colab (central difference, step 1e-6) for both MSE conventions and compared them with the convention Claude used (the 1/2 version). I read the derivation steps by hand.

**Verdict:** Correct. Claude's dL/dw and dL/db matched the numerical values for the convention it chose.

**Limitations:** The prompt did not say which MSE convention to use, and the two conventions give gradients that differ by a factor of 2, so the answer is only correct relative to the convention stated. The checking code was written with Claude's help. The numerical check tests the numbers, not the derivation steps, which I read by hand. I tested only one input point.
