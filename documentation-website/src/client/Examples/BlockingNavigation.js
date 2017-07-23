import React from 'react';
import BaseExample from '../components/BaseExample';
import { InlineJS, PrismBlock } from '../components/PrismBlocks';
import { Note } from '../components/Messages';
import { Link } from 'curi-react';
import { Section, Subsection } from '../components/Sections';
import CodeSandboxDemo from '../components/CodeSandboxDemo';

const slug = 'blocking-navigation';
const name = 'Blocking Navigation';

const BlockingNavigation = () => (
  <BaseExample>
    <h1>{name}</h1>
    <Section
      title='Explanation'
      id='explanation'
    >
      <p>
        Sometimes, you don't want the user to leave the page. Ideally, this is for their own
        good, such as when a form is half filled out, and not becacuse you're running a spam
        site.
      </p>
      <p>
        When you want to do this, you can use the <InlineJS>&lt;Block&gt;</InlineJS> component
        from react-curi to display a user confirmation that requires user input before navigation
        will occur.
      </p>
    </Section>

    <Section
      title='Live Demo'
      id='demo'
    >
      <CodeSandboxDemo src='https://codesandbox.io/embed/KOvy6K0KM' />
    </Section>

    <Section
      title='On GitHub'
      id='source'
    >
      If you want to run this code locally, the source code is available on GitHub{' '}
      <a href='https://github.com/pshrmn/curi/tree/master/examples/blocking-navigation'>here</a>.
    </Section>
  </BaseExample>
);

export default {
  name,
  slug,
  component: BlockingNavigation
};
