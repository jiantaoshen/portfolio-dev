---
lang: en

title: "Discussion on AI Development in 2026"

description: "A discussion about the advantages, limitations, and changing role of programmers in AI-assisted software development in 2026"

date: 2026-09-03

readingTime: "7 min"

tags:

  - "AI Development"

  - "Discussion Notes"

draft: false

---

## Question

More and more companies are using AI today to improve development efficiency. In the past, developing a website or software application might have required several programmers working together. Today, with the help of AI, one programmer can perform parts of the work that previously required several people. Because of this, people often make statements such as: one programmer plus AI is equivalent to three programmers. But is that really true?

OpenAI has also conducted a much more extreme experiment. They started with an empty Git repository and let Codex write the project's code, tests, CI configuration, documentation, internal tools, and much more. The project was initially driven by 3 engineers, and the team later grew to 7 people. After five months, the codebase had grown to around one million lines of code, and approximately 1,500 Pull Requests had been merged. The OpenAI team estimated that the project took roughly one-tenth of the time that equivalent development would have taken with a more traditional, human-driven workflow. Does this mean software companies will need fewer programmers in the future, or perhaps eventually no programmers at all?

## Personal Experience

I have used both the free version of ChatGPT and ChatGPT Plus to develop websites. When I studied web development at Lexicon AB, my mentors also mentioned that rapid AI-assisted development was becoming increasingly common and that companies would increasingly expect developers to know how to work with AI tools. Therefore, I have used AI assistance in almost every project I have worked on since then. During this process, I have clearly noticed that AI can increase development speed.

Previously, when I encountered a problem I did not recognize, I often had to search Google several times:

- What does this error message mean?

- Is there a similar question on Stack Overflow?

- Where is the official documentation?

- Which solution is suitable for my project?

Today, in many cases, I can directly give the code, error message, and context to an AI and let it suggest possible solutions. For a relatively simple project, it may be possible to create a working prototype in one or two days with the help of AI. Compared with when I was at university and mainly used Google, Stack Overflow, and official documentation, experimenting with new technologies is much faster today. However, AI-assisted development does not simply mean that you “write one sentence and let the program build itself.” In my own experience, I have also noticed that AI can create many new problems.

### Errors Caused by Context

When I used the free version, I often felt that the AI lost track of the existing code structure. It would generate new code using a new architecture. When that code was added to the real project, it could cause bugs, and fixing those bugs sometimes required changing the current architecture. This problem becomes more obvious in more complex projects.

In my own experience, this happened less often with the paid version. However, there was a greater chance that it would leave behind “code waste.” For example, a project may already have gone through many changes, but the AI may still generate new code based on an older version of the architecture. The newly generated code may look perfectly reasonable on its own, but when added to the actual project it may conflict with the current implementation.

By comparison, I experienced this type of problem less often when using the paid version. However, it seemed more likely to leave behind “code waste.” For example, in later answers, the AI could still generate code belonging to an older architecture that had already been abandoned. The good news was that this code usually did not conflict with the existing implementation when added to the project. It simply remained there without serving any real purpose.

Even if you establish clear coding rules, after many responses the AI may gradually forget them and begin generating code that no longer follows the standard.

A concrete example is Tailwind CSS. The AI often generated `className` attributes with each class placed on a separate line, meaning that a single `className` could take up seven or eight lines of code.

Because of this, I introduced a coding rule: one `className` should be written on a single line.

After a number of additional responses, however, the AI eventually returned to its old behavior and once again generated `className` attributes that stretched across seven or eight lines.

In a small project, the result may simply be that the code looks messy. In a large project that must be maintained over a long period of time, however, this can develop into technical debt.

Interestingly, OpenAI encountered a similar problem in its own experiment with agent-based development. They described how Codex tends to reproduce patterns that already exist in a repository, including bad ones. For a period of time, the team had to dedicate specific effort to cleaning up what they called “AI slop.”

Later, instead of continuing to let engineers clean everything manually, they encoded good engineering principles as rules and allowed other agents to regularly scan the codebase, identify problems, and automatically create refactoring changes.

This shows that AI can not only increase the speed of generating code, but can also increase the speed at which technical debt is created.

## Does AI Really Equal Multiple Programmers?

I think this is true to some extent. A programmer who is skilled at using AI can, in certain situations, produce an amount of code that might previously have required two or three people.

What is truly interesting about OpenAI's experiment is that the role of the programmers gradually changed from “writing the code themselves” to “building an environment in which AI can work reliably.”

The engineers no longer spend most of their time personally implementing every function. Instead, they increasingly work on:

- defining tasks;

- designing system architecture;

- building tests;

- creating coding standards;

- creating feedback mechanisms;

- making logs and monitoring accessible to AI;

- determining whether the final result meets the requirements;

- identifying which capabilities are missing when an agent fails.

This means AI can transform clearly defined requirements into code.

## Potential Risks

### Dependence on AI Services

Once people become used to faster development, it can be difficult to completely return to a traditional workflow in which all code is written manually. This creates a new type of dependency.

If powerful AI services in the future:

- raise their prices;

- change usage limits;

- reduce available context;

- move important features to more expensive enterprise plans;

then individuals and companies that depend heavily on AI may be forced to accept the higher costs.

Software companies are already dependent on cloud servers, databases, development frameworks, and third-party APIs. In the future, another type of infrastructure may become important:

> AI inference capacity.

### Programmers May Lose the Ability to Handle Complex Problems

If I want to test a new framework today, I can directly ask AI to create a simple project. This is very useful.

Previously, I might have needed to spend several days or even weeks learning a framework before discovering that the framework was not suitable for my project.

Now, I can first let AI create a prototype and quickly determine whether the technology is suitable.

However, there is also a trap: being able to get AI to write something does not mean that you actually know how to do it yourself.

It is easy for a programmer to start thinking:

“I have worked with React.”

“I have worked with Docker.”

“I have used this database.”

In reality, the AI may have written most of the code while the programmer never truly understood why it worked.

In a simple project, this does not necessarily have to be a problem. The problem appears when something complicated goes wrong.

If the programmer does not understand the system that the AI has written, it becomes difficult to determine:

- why the AI is wrong;

- which layer actually contains the problem;

- which change may affect another feature;

- whether the solution proposed by the AI is only hiding the symptoms.

Therefore, I believe one of the most important skills in the future will be:

> Being able to determine whether the code written by AI is actually correct.

### AI Can Be Very Confident While Still Being Wrong

Answers generated by AI are not always correct.

In *Why Language Models Hallucinate*, OpenAI discusses an interesting problem: many existing training and evaluation systems can, in certain situations, reward models for “guessing” instead of rewarding them for admitting uncertainty.

Suppose a model has only a 40 percent probability of knowing the correct answer.

If:

- Correct answer: 1 point

- Wrong answer: 0 points

- “I don't know”: 0 points

then it is rational for the model to guess.

Answering “I don't know” guarantees zero points, while guessing at least gives the model a chance to receive one point.

This can also become dangerous in software development.

The AI may provide a very detailed and convincing explanation. However, something that “sounds correct” and something that “is correct” are two completely different things.

If the programmer does not have enough knowledge to evaluate the answer, the project may continue to be changed in completely the wrong direction.

## Trade-Offs

Despite these risks, I still believe that most companies have very few reasons to completely avoid AI-assisted development.

The reason is simple:

> Time is a cost, and speed to market is itself a competitive advantage.

Suppose two companies discover the same market opportunity.

Company A takes six months to build its product.

Company B uses AI and can launch a working version in two months.

Even if Company B's code quality is not as elegant, the company may still gain an advantage by:

- acquiring users earlier;

- collecting feedback earlier;

- validating its business model;

- adjusting the direction of the product;

- capturing market share.

In such a situation, companies may choose to accept many low-probability risks that may not appear until much later.

This does not mean that the risks do not exist. It means that companies are forced to make trade-offs.

## Conclusion

AI-assisted development is genuinely fast.

Even when taking into account the time required to fix bugs, explain requirements again, and clean up incorrect code, development with AI is still often faster than development without AI.

In the future, the market may need fewer people whose only task is to write code, while demand may increase for engineers who can define problems, design systems, evaluate results, and guide AI.

OpenAI's experiment also demonstrates this kind of future.

It was not a case of seven people without software development knowledge spending five months building a program.

Instead, the engineers invested significant effort in designing the system.

In other words, AI wrote the code, but humans designed the system that allowed AI to continue writing code reliably.

In the future, an increasingly important ability may be:

> I can make AI continuously and reliably produce high-quality software, and I know when I should not trust it.

## References

- OpenAI, *Why Language Models Hallucinate*  
  https://openai.com/index/why-language-models-hallucinate/

- OpenAI, *Harness engineering: leveraging Codex in an agent-first world*  
  https://openai.com/index/harness-engineering/