import React from 'react';
import BaseGuide from '../components/BaseGuide';
import { InlineJS, PrismBlock } from '../components/PrismBlocks';
import { Note } from '../components/Messages';
import { Link } from 'curi-react';
import { Section, Subsection } from '../components/Sections';

const slug = 'load';
const name = 'The Load Property';

const Load = () => (
  <BaseGuide>
    <h1>{name}</h1>

    <p>
      In the code splitting guide, we used the preload property of routes. Routes also have a load
      property. The biggest difference between the two is that load is called every time a route
      matches, whereas preload is only called the first time a route matches.
    </p>

    <p>
      load is where you should perform any data loading for the route. We'll start a new
      application here, which is a basic recipe site. We want to have a route for a recipe list
      page as well as a route for specific recipes.
    </p>

    <PrismBlock lang='javascript'>
      {
`const routes = [
  {
    name: 'Recipe List',
    path: 'recipes',
    body: () => RecipeList
  },
  {
    name: 'Recipe',
    path: 'recipe/:id',
    body: () => Recipe
  }
];`
      }
    </PrismBlock>

    <p>
      Whenever the Recipe List route matches, we want to fetch a list of recipes from the server.
      When the Recipe route matches, we just want one specific recipe (using the id param from the
      path).
    </p>

    <p>
      The load function will be passed two arguments: the params object that contains variables
      parsed from the location's pathname and a modifiers object. The modifiers object has a few
      methods that you can call in order to modify the response object that will be generated.
      They are fail, setStatus, setData and redirect. They are explained in more detail in the{' '}
      <Link to='Guide' params={{ slug: 'routes' }} details={{ hash: 'load'}}>all about routes</Link>
      {' '}guide. Here, we will use the last two: setData and redirect.
    </p>

    <p>
      First we will add a load function to our Recipe route. This function will make a request
      to our (fake) API. Then, we will call response.setData to attach our loaded data to the
      response.
    </p>

    <PrismBlock lang='javascript'>
      {
`{
  name: 'Recipe',
  path: 'recipe/:id',
  body: () => Recipe,
  load: (params, modifiers) => {
    return fakeAPI.getRecipe(params.id)
      .then(data => {
        modifiers.setData(data);
      });
  }
}`
      }
    </PrismBlock>

    <p>
      Now, when we navigate to /recipe/chocolate-chip-cookies, our load function will call the
      fake API function to load the recipe and set the loaded data for the response. That means
      that the data we load will be available on the generated response object as response.data.
    </p>

    <p>
      One possible downside to the implementation of load above is that we will be making requests
      to our API every time the route loads. To prevent this, you might want to add a data cache
      to your application. Using this, you can store the results of previous requests and use that
      for subsequent requests instead of having to request the data from the server again.
    </p>

    <PrismBlock lang='javascript'>
      {
`{
  name: 'Recipe List',
  path: 'recipes',
  body: () => RecipeList,
  load: () => {
    if (cache.has('recipes')) {
      return Promise.resolve(cache.get('recipes'));
    }

    return fakeAPI.getRecipes()
      .then(data => {
        cache.set('recipes', data);
        return data;
      });
  }
}`
        }
      </PrismBlock>

      <p>
        If at some point in time we decide that we want to change our URI pathname structure, we
        can also use the load function to redirect.
      </p>

      <p>
        By calling the modifier's redirect method, you can specify the URI that we should redirect
        to.
      </p>

      <PrismBlock lang='javascript'>
        {
`{
  name: 'Old Recipe',
  path: 'r/:id',
  load: (params, modifiers) => {
    modifiers.redirectTo(\`/recipe/$\{params.id\}\`);
  }
}`
        }
      </PrismBlock>

      <p>
        Please note that this does not actually perform a redirect. Instead, it will make it so
        that the emitted response is a "redirect" response, with a redirectTo property you can use
        to redirect manually. Below is an example of a render function (passed to a{' '}
        <InlineJS>&lt;Navigator&gt;</InlineJS>) that renders a <InlineJS>&lt;Redirect&gt;</InlineJS>
        {' '}when the response contains a redirectTo value.
      </p>

      <PrismBlock lang='javascript'>
        {
`function renderFunction(response) {
  if (response.redirectTo) {
    return <Redirect to={response.redirectTo} />
  }
  // ...
}`
        }
      </PrismBlock>

      <p>
        load is a great place to do any route setup prior to actually rendering the route. Please
        remember, however, that your application will not be re-rendering until after the load
        function has resolved. If you have a long running load function, you may wish to implement
        some sort of loading display. The prefetching data example shows one approach to how to do
        this.
      </p>
  </BaseGuide>
);

export default {
  name,
  slug,
  component: Load
};
