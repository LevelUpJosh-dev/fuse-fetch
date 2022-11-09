# fuse-fetch

Fuse-fetch the simplist way to add HTML, CSS and JS resources to your application nested with vanilla JS

---

## Example
![fuse-fetch-example](https://user-images.githubusercontent.com/23381860/200876415-84def23f-9442-4146-8b02-46be15763489.png)


To use this functionality simple include the node package as a script to the head fo your index.html and/or base html file. From there just utilize the new html tag <fuse-fetch> to do a include of a resource 

#### Basic Usage
![carbon (1)](https://user-images.githubusercontent.com/23381860/200889827-db6c734a-17ae-4bbc-9ba9-15e591d0b8c9.png)

#### Resource Failed to Load Example 
the example here will not cause the rest of your application to fail. Each fuse-fetch manages errors within the component and applies helpful error messaging to the element attributes as can be seen below. This means that indvidual modular sections of your site can/could fail to load for various reasons however the docuement load and the future fuse-fetch will process as normal.

![carbon](https://user-images.githubusercontent.com/23381860/200889776-3d65a85f-0c8b-4721-bd64-3231ce067629.png)
