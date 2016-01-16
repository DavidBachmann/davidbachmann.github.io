---
layout: article
title: Maintainable CSS
toc: [maintainable-css, bem, namespaces, scoping, project-structure, moving-on]
---

#Maintainable CSS

CSS's biggest pitfalls is that, by default, every style that we write applies globally to our whole project. In large web applications naming collisions are guaranteed to happen if you're not being careful and your CSS can quickly turn into a maintenance nightmare. Making changes to a single class name can easily have unwanted and even catastropic effects somewhere else in your application. Because of this developers opt to add more and more rules to the stylesheet, making the codebase larger and more confusing. Nowadays we have a few weapons in our arsenal that are designed to combat these problems. I will attempt to quickly cover the essentials of how to write maintainable CSS for large projects. I will be using the [Sass](http://sass-lang.com){:target="_blank"} preprocessor, the preprocessor of my choice, to demonstrate these techniques. If you prefer regular CSS, or another preprocessor, you should still be able to get something useful out of this article.

BEM
---

BEM stands for *Block*, *Element*, *Modifier*. It is a naming methodology invented by the development team at [Yandex](http://yandex.com){:target="_blank"} around 2005. They were bulding a sophisticated (for that time anyways) music service called Yandex Music and the massively growing CSS codebase was causing everyone headaches. Fast forward a few years and their in-house best practices had been gaining attention and had been featured at a development conference in Moscow. One of the first ones to give attention to BEM in the western world was [Harry Roberts](http://csswizardry.com){:target="_blank"}. He even proposed his own naming scheme based on the BEM principles; the widely accepted *BEM-like naming convention*—and that's the convention that I'll be recommending. It's simpler to get your head around and therefor easier to get fellow developers to adopt. Let's take a look at how this naming convention works in practice.

{% highlight html %}
<!-- The HTML -->
<div class="block">
  <div class="block__element"></div>
  <div class="block__element--modifer"></div>
</div>
{% endhighlight %}

{% highlight scss %}
// The SCSS
.block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  &__element {
    flex: 1 2 50%;
    background: rebeccapurple;
    &--modifier {
      background: aliceblue;
    }
  }
}
{% endhighlight %}

Note how Sass provides great support for BEM with the ampersand. You may think to yourself that the BEM syntax itself isn't that great to look at—and you wouldn't be wrong. Most of us BEM-*enthusiasts* felt the same way at first. The thing is that the benefits outweigh the weirdness of the syntax—and you'll find that using it makes it quickly grow on you until you actually like it. There are more examples of BEM in practice further into this article.

Namespaces
---

Namespaces are a great way to extend the transparent and self-documenting principal of BEM even further. They allow us to clearly signify what the role of a certain block in our markup is. These namespaces are not set in stone, and will differ from project to project based on complexity and the development team's preferences. <br /> Below are some my most used namespaces:

* **c-**: Signify that something is a *component*. <br/> An independant piece of UI that can stand on its own.
* **l-**: Signify that a element controls the *layout*. For example grid classes.
* **h-**: Signify that something is a *helper* class. <br/> Common helper classes are classes that align text, add margin or floats.
* **is-**: Signify that something is styled a particular way because of a *state* or a *condition*.
* **t-**: Signify that something is styled a particular way because it is a part of a *theme*.
* **js-**: A hook for *JavaScript* and should not be styled. This is often an ID instead of a class.

Scoping
---
Next up is scoping, also known as prefixing. If multiple teams are working on different parts of a large web application where each team has their own way of authoring CSS and a naming methology like BEM can't be forced, we can use scopes.

Each team gets their own prefix, in our example *PDS* (for an imaginary *Player Deposit Service* team). The team prefixes their Sass master file...

{% highlight css %}
// in their master.scss file
.PDS {
  @import "base/*";
  @import "layout/*";
  @import "vendor/*";
}
{% endhighlight %}

...and essentially hide their code behind the prefix. None of their styles will apply in the application unless the top-most element has their class name applied to it. Now the Player Deposit Service team can even include a framework like Bootstrap or Foundation into their part of the application without affecting the other teams.

Project structure
---

The last thing I want to mention is the importance of a good project structure. This goes beyond CSS but ties nicely with the philosphy of both BEM and namespaces. If a developer wants to change some styles on a *slideshow* component (s)he should be able to go into the <span class="h-mono">/components/</span> folder and find the <span class="h-mono">_slideshow.scss</span> partial. To illustrate this and to see the previous concepts in action let us mock up this slideshow component.

{% highlight html %}
<div class="c-slideshow" id="js-slideshow">
  <div class="c-slideshow__slide">
    <button class="c-slideshow__button">Learn more</button>
  </div>
  <div class="c-slideshow__slide is-active">
    <button class="c-slideshow__button">Learn more</button>
  </div>
</div>

{% endhighlight  %}
Note that we don't write <span class="h-mono">c-slideshow__slide__button</span>.
BEM does not recommend nesting of elements because it hinders the ability to change the structure of the block without modifying the existing code.

{% highlight scss %}
// > components/_slideshow.scss

.c-slideshow {
  display: flex;
  …
  &__slide {
    display: none;
    …
    &.is-active {
      display: block;
    }
  }
  &__button {
    padding: 1rem;
    …
    &--next {
      background-image: url('next.svg');
    }
    &--prev {
      backgroung-image: url('prev.svg');
    }
  }
}
{% endhighlight %}

This component lives in its respectful folder in a project that might look something like this:

{% highlight xml %}
├───Styles
│   ├───Layout
│   │   └───_header.scss
│   │   └───_section.scss
│   │   └───_footer.scss
│   │   └───_article.scss
│   ├───Components
│   │   └───_slider.scss
│   │   └───_banner.scss
│   │   └───_cart.scss
│   │   └───_profile.scss
│   ├───Core
│   │   └───_reset.scss
│   │   └───_buttons.scss
│   │   └───_typography.scss
│   ├───Environment
│   │   └───_config.scss
│   │   └───_mixins.scss
│   │   └───_functions.scss
│   ├───Vendor
│   │   └───_that-plugin.scss
{% endhighlight %}

I highly recommend importing each individual file in your master SCSS file instead of using glob/wildcards <span class="h-mono">(@import \*\*/*)</span>. That way you always keep a good overview over what's being included in your final stylesheet.

Moving on
---

Hopefully you now have a good idea of how to better organize and maintain your stylebase. If you have any comments or questions feel free to contact me. <br /> For further reading on this topic I recommend the following websites and articles.

- [CSS Guidelines by Harry Roberts](http://cssguidelin.es){:target="_blank"}
- [Modular CSS with Sass and BEM](http://www.mathayward.com/modular-css-with-sass-and-bem){:target="_blank"}
- [BEM and SMACSS: Advice From Developers Who’ve Been There](http://www.sitepoint.com/bem-smacss-advice-from-developers){:target="_blank"}
- [Battling BEM – 5 common problems and how to avoid them](https://medium.com/fed-or-dead/battling-bem-5-common-problems-and-how-to-avoid-them-5bbd23dee319){:target="_blank"}