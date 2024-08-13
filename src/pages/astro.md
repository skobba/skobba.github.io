# Astro

## Dynamic routing
The process of creating multiple page routes from one file in Astro with ```[..tag].astro```files.

## Schema
In order for Astro to recognize your schema, quit the dev server (CTRL + C) and run the following command: ```npx astro sync. This ```.

## Refactor
An Astro component (.astro file) can function as a:
* page
* UI component
* layout

To display a page title on the page, you can:
* use a standard HTML element on the page with static text (e.g ```<h1>Home Page</h1>```)
* use a standard HTML element on the page referring to a variable defined in your component’s frontmatter script (e.g. ```<h1>{pageTitle}</h1>```)
* use a layout component on the page, passing the title as a component attribute (e.g. ```<BaseLayout title="Home Page" /> or <BaseLayout title={pageTitle} />```)

Information can be passed from one component to another by:
* importing a UI component and rendering it in the template of another component
* passing props to a component where it is rendered via a component attribute
* sending HTML content to be rendered inside another component using a ```<slot />``` placeholder

Don’t forget to:
* Pass a page title as props via a component attribute.
* Let the layout be responsible for the HTML rendering of any common elements.
* Move any existing ```<style>``` tags in the page ```<head>``` with styles you wish to keep to the page HTML template.
* Delete anything from each individual page that is now being handled by the layout, including:
** HTML elements
** Components and their imports
** CSS rules in a ```<style>``` tag (e.g. ```<h1>``` in your About page)
** ```<script>``` tags

