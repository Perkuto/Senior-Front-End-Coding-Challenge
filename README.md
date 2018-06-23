# Coding Challenge
Fork this repository, complete challenge, submit pull request and provide product preview URL.

### Project Guidelines
* Create shareable walls of pictures based on keyword search query
* Use [Flickr API](https://www.flickr.com/services/api)

### Technical Guidelines
* Javascript Framework
* Responsive

### Product Specifications
* See wireframe.png

### Angular Shareable image feed

## Install local instance
1. Pull from this repo
2. Install lastest nodeJs if !node
3. Run `npm install` in the root directory
4. Run ` npm run build ` or `ng build` to build the project
4. Run ` npm run start ` or `ng serve` to start the app
5. Open browser and visit `http://localhost:4200/`

## Example
A working example can be found here [sunset photot](https://jwparadox.github.io/dist-gallary-app/#sunset)

* Type in any keyword/keywords to start a search (based on flicker search api text search, search by tags not implemented in this version)
* Deeplink will be updated accordingly: e.g. `http://localhost:4200/#cat` for cat photos
* Search result can be shared by copy and provide the deeplink in address bar
* Scroll down to the bottom, images will be loaded as you scroll
* Images are centered and "cropped" to adapt the same size as shown in wireframe(so images with people might not at the best focus)



