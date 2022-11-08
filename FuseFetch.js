'use strict';

/**
 * @namespace FuseFetch
 * @example <fuse-fetch name="my-component" type="html"></fuse-fetch>
 * @example <fuse-fetch name="my-component2" type="js" error="File not found" path="./Js/myComponent.js"></fuse-fetch>
 */
class FuseFetch extends HTMLElement {
    resourcePath = '';
    error = '';
    constructor() {
        super();
    }
    async connectedCallback() {
        const methods = {
            "html": Html,
            "js": Js,
            "css": Css
        };
        const resourceMethod = methods[this.attributes.type.value];
        this.innerHTML = await FetchOrEmpty(this, resourceMethod);
        const GoFetchLoadComplete = new CustomEvent(`${this.attributes.name.value}.${this.attributes.type.value}`);
        document.dispatchEvent(
            GoFetchLoadComplete, {
                bubbles: true,
                composed: true
            }
        );
    }
}

/** Fetch HTML resources **/
async function Html (fetchInstance) {
    const filePath = `../Html/${fetchInstance.attributes.name.value}.html`;
    fetchInstance.setAttribute('path', filePath);
    const html = await fetch(filePath);
    const htmlText = await html.text();
    return `
        ${htmlText}
    `;
}

/** Fetch CSS resources **/
async function Css (fetchInstance) {
    const filePath = `../Css/${fetchInstance.attributes.name.value}.css`;
    fetchInstance.setAttribute('path', filePath);
    const css = await fetch(filePath);
    const cssText = await css.text();
    return `
        <style>
            ${cssText};
        </style>
  `;
}

/** Fetch JS resources **/
async function Js (fetchInstance) {
    const filePath = `../Js/${fetchInstance.attributes.name.value}.js`;
    fetchInstance.setAttribute('path', filePath);
    const js = await fetch(filePath);
    const jsText = await js.text();
    return `
        <script>
            ${jsText};
        </script>
  `;

}

/**
 * Wraps the resource fetch into a try catch this allows us to fail gracefully
 * on a per-resource basis.
 *
 * @namespace FuseFetch
 * @param {FuseFetch} fetchInstance - The instance of the FetchFuse.
 * @param {Function} fetchMethod - The method to use to fetch the resource
 *
 * <fuse-fetch name="my-component" type="html"></fuse-fetch>
 * <fuse-fetch name="my-component2" type="js"></fuse-fetch> Fails gracefully
 * <fuse-fetch name="my-component3" type="css"></fuse-fetch>
 *
 * In the above example if component2 fails to load the pre and post fuse-fetch tags will be unaffected.
 * Rendering as expected you will also get inline errors as to what failed for that component.
 * <fuse-fetch name="my-component2" type="js" error="File not available"></fuse-fetch>
 **/
async function FetchOrEmpty (fetchInstance, fetchMethod) {
    let resourceResponse;
    try {
        resourceResponse = await fetchMethod(fetchInstance);
    } catch (error) {
        fetchInstance.setAttribute('error', error);
    }

    return await resourceResponse || '';
}

customElements.define('fuse-fetch', FuseFetch);
