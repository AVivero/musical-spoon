# Project Architecture and Structure

As recommended, the project was created using the following techs:

- JS (instead of Typescript as it's not strictly required, there's a recommended time limit and I personally feel more confortable using vanilla JS. However it's clear to me why Typescript is a better choice for a project like this, to be potentially used across different projects and teams)
- React
- Vite
- Vitest
- React Testing Library
- Storybook (Not necessary for the test, but I find stories a great complement to tests, for documentation, as they allow to visualize multiple examples of the component integration. It could also be potentially used for visual regression testing)
- TailwindCSS (Not necessary for the test, but I want the stories to look good)

# Modal Component

## Component Architecture / Compound Component Pattern
I decided to follow a compound component pattern, as it allow for great flexibility and encapsulation. If I had to build this component, for a real project, and if requirements and existing use cases allowed it, I would have created a wrapper over Radix UI Modal component, as it's a well-known and battle-tested library. I have personally found the accessibility implementation of Radix's Dialog to be excellent.

## Future Improvements
- Redirect focus to the modal when it opens and implement focus trapping
- Review each primitive's props and add/remove as needed
- Review all primitives for accessibility
- Implement more stories, showcasing different use cases / integrations, highlighting the flexibility of the component. 
- Rethink styling approach, currently only via className. The team may also want to support styling via css in js, howeveer this could also be implemented at a superior wrapper.

# General Comments

## Time spent

Test started at 12:00PM on 02/03/2025. Ended at about 3:15PM, after a 20 mins forced break by a distraction.

## Comments on the test

- I found this test fun and engaging. I personally find TDD very useful, and I actually try to use this approach when building similar components, as applicable. A time estimation of 2:30h is spot on.
