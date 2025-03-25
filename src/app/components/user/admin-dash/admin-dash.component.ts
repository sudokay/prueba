import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-admin-dash',
  standalone: false,
  templateUrl: './admin-dash.component.html',
  styleUrl: './admin-dash.component.css'
})
export class AdminDashComponent implements OnInit {
  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.loadScript('/public/assets/js/scripts-adminView.js'); // Ruta al archivo JS
    this.loadScript('/public/assets/assets/demo/chart-area-demo.js'); // Ruta al archivo JS
    this.loadScript('/public/assets/assets/demo/chart-bar-demo.js'); // Ruta al archivo JS
    this.loadScript('/public/assets/js/datatables-simple-demo.js'); // Ruta al archivo JS

  }

  loadScript(src: string) {
    const script = this.renderer.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    script.async = true;
    this.renderer.appendChild(this.document.body, script);
  }
}
