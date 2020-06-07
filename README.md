# TentsGame

**Welcome to Tents!**

This is a mobile implementation of the Tents and Trees puzzle that I wrote. It's based on my CS B.Sc final project that's uploaded here under 'Tents'.

In this puzzle, one is given an n × n grid with initial markings (referred to as 'trees') and is tasked with placing a different type of markings (referred to as 'tents'), under several rules.
We tackled the problem in our project with two main approaches:<br />
          <br />SAT<br />
             We define a CNF expression for an instance of the problem with the help of an article,<br /><br />
                *SAT Encodings of the AT-Most-k Constraint : Some Old, Some New, Some Fast, Some Slow. / Frisch, Alan M.;
                 Giannaros, Paul A.2010.*<br /><br />
             whose solution describes a legal solution to the instance, and solve it using the SAT4J solver.<br /><br />
          ILP<br />
          2. ILP – We construct a system of linear integer inequalities describing the
             constraints of an instance, whose solution yields a legal solution for the instance, 
             and solve it using the google ortools package.<br />
             Later I rewrote it using Choco solver and used it in this app as a backend package. <br />
          <br />
          3. Additionally, we built a generator which constructs solvable maps in polynomial time,
             by generating a solved legal instance, with as many trees as possible, and returning an
             unsolved instance for which this solution is appropriate.
             This, in turn, enabled us to perform statistical analysis of tree coverage in generated maps.
<br /><br />
**The Mobile Game:**<br /><br />
I used some of the **Java** code from this project as a backend package and implemented the puzzle using the **Choco** Constraint solver package, **React Native** and **JavaScript**
