# TentsGame

<br />

**Welcome to Tents!**

This is a mobile implementation of the Tents and Trees puzzle that I wrote. It's based on my CS B.Sc final project that's uploaded here under 'Tents'.

Main             |  Settings         |  Game screen          |  About the app          |  Statistics          
:-------------------------:|:------------------------:|:-------------------------:|:-------------------------:|:-------------------------:
<img src="https://user-images.githubusercontent.com/64784817/83975590-4ec5ce80-a8fd-11ea-96f2-88d8faff0b3a.png" width="200" height="356" />  | <img src="https://user-images.githubusercontent.com/64784817/83975572-2c33b580-a8fd-11ea-91aa-88d502862144.png" width="200" height="356" />|  <img src="https://user-images.githubusercontent.com/64784817/83975610-5be2bd80-a8fd-11ea-8478-6f0d1b73ee2a.png" width="200" height="356" />|  <img src="https://user-images.githubusercontent.com/64784817/83975635-6bfa9d00-a8fd-11ea-88ba-17afcf81a8f2.png" width="200" height="356" />|  <img src="https://user-images.githubusercontent.com/64784817/83975639-76b53200-a8fd-11ea-93fb-e0fb9b84788c.png" width="200" height="356" />




In this puzzle, one is given an n × n grid with initial markings (referred to as 'trees') and is tasked with placing a different type of markings (referred to as 'tents'), under several rules.
We tackled the problem in our project with two main approaches:<br />
          <br />SAT<br />
             We define a CNF expression for an instance of the problem with the help of an article,<br /><br />
                *SAT Encodings of the AT-Most-k Constraint : Some Old, Some New, Some Fast, Some Slow. / Frisch, Alan M.;
                 Giannaros, Paul A.2010.*<br /><br />
             whose solution describes a legal solution to the instance, and solve it using the SAT4J solver.<br /><br />
          ILP<br />
             We construct a system of linear integer inequalities describing the
             constraints of an instance, whose solution yields a legal solution for the instance, 
             and solve it using the google ortools package.<br />
             Later I rewrote it using Choco solver and used it in this app as a backend package. <br />
          <br />
             Additionally, we built a generator which constructs solvable maps in polynomial time,
             by generating a solved legal instance, with as many trees as possible, and returning an
             unsolved instance for which this solution is appropriate.
             This, in turn, enabled us to perform statistical analysis of tree coverage in generated maps.
<br /><br />
**The Mobile Game:**<br /><br />
I used some of the **Java** code from this project as a backend package and implemented the puzzle using the **Choco** Constraint solver package, **React Native** and **JavaScript**
