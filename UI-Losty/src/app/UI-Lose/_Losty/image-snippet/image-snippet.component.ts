// import { Component, OnInit } from '@angular/core';
// import { ImageService } from '../../Service/image-service.service';

// class ImageSnippet {
//   constructor(public src: string, public file: File) {}
// }

// @Component({
//   selector: 'app-image-snippet',
//   templateUrl: './image-snippet.component.html',
//   styleUrls: ['./image-snippet.component.scss']
// })
// export class ImageSnippetComponent implements OnInit {
//   selectedFile: ImageSnippet;

//   constructor(private imageService: ImageService){}

//   processFile(imageInput: any) {
//     const file: File = imageInput.files[0];
//     const reader = new FileReader();

//     reader.addEventListener('load', (event: any) => {

//       this.selectedFile = new ImageSnippet(event.target.result, file);

//       this.imageService.uploadImage(this.selectedFile.file).subscribe(
//         (res) => {
        
//         },
//         (err) => {
        
//         })
//     });

//     reader.readAsDataURL(file);
//   }
  
//   ngOnInit() {
//   }

// }
