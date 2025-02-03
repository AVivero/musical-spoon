
# Project Architecture and Structure
As recommended, the project was created using the following techs:
- JS (instead of Typescript as it's not strictly required, there's a recommended time limit and I personally feel more confortable using vanilla JS. However it's clear to me why Typescript is a better choice for a project like this, to be potentially used across different projects and teams)
- React
- Vite
- Vitest
- React Testing Library
- Storybook (Not necessary for the test, but I find stories a great complement to tests, for documentation, as they allow consumers to visualize multiple examples of the component integration. It could also be potentially used for visual regression testing)
- TailwindCSS (Not necessary for the test, but I want the stories to look good)


# Modal Component
I decided to follow a compound component pattern, as it allow for great flexibility and encapsulation. If I had to build this component, for a real project, and if requirement and existing use cases allowed it, I would have created a wrapper over Radix UI Modal component, as it's a well-known and battle-tested library. I have personally found the accessibility implementation of Radix's Dialog to be excellent.


# Tests
Fixed typo in last test description (onClock -> onClose)