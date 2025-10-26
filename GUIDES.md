# Guides collection

## How to apply styles based on Figma design
This guide is especially useful when customizing shadcn components to fit our design on Figma.  

> [!important]
> When reusing styled blocks of elements many times, consider creating a custom component.
> 
> AVOID applying colors or typography by manually adding tailwind rules, 
> use instead our custom variables as shown below

### Background color
Use `bg-` and append the color variable  
NB: do NOT include the variable class (e.g. `neutrals`) in the classname  

e.g. `neutrals/background` => `bg-text-primary`  
e.g. `buttons/button-primary` => `bg-button-primary`  

### Text color
Use `text-` and append the color variable  
NB: do NOT include the variable class (e.g. `neutrals`) in the classname    

e.g. `neutrals/text-primary` => `text-text-primary`  
e.g. `accents/blue-secondary` => `text-blue-secondary`  

### Typography
We created a custom [Tailwind utility class](https://tailwindcss.com/docs/adding-custom-styles#adding-custom-utilities)
to apply the styles matching the typography library on Figma.  
Use `typo-`, adding the type and the weight separated by hyphen.  

e.g. `polinet-type/baseline/display/extralarge` => `typo-display-extralarge`  
e.g. `polinet-type/baseline/label/small` => `typo-label-small` 


## How to create a new UI component
We use shadcn components as base UI elements because they support variants and sizes, while usually following React reusable components guidelines.  

> [!important]
> shadcn components must be UI elements that are generally used across the website (like a Card or a Button).  
> If you need a component page-specific or section-specific, build upon shadcn components.  
> shadcn components must be the individual pieces that compose an end-user component.  

Check if we already have that UI component in the `src/components/ui` folder.  
- If it does not exist:
  1. visit [shadcn's components list](https://ui.shadcn.com/docs/components) and follow the instructions to install
  2. change the default styling using our custom theme variables based on Figma design. See [this guide](#how-to-apply-styles-based-on-figma-design)

- If the component already exists, but you need to add variants or sizes, follow the shadcn's button implementation:
  1. visit [shadcn's button page](https://ui.shadcn.com/docs/components/button#installation)   
  2. click on "Manual"
  3. expand the code section and see how it is done
