import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FileManipulationService } from 'src/app/services/file-manipulation.service';
import { Observable } from 'rxjs';
import { FileSpecs } from 'src/app/models/fileSpecs';
import { element } from 'protractor';

@Component({
  selector: 'app-drive-contents',
  templateUrl: './drive-contents.component.html',
  styleUrls: ['./drive-contents.component.css']
})
export class DriveContentsComponent implements OnInit {

  files: FileSpecs[];
  constructor(private fileService: FileManipulationService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.fileService.getFiles("root")
      .then((res) => {
        this.files = res;
        this.cd.detectChanges();
      })
  }

  getfiles(id: string): void {
    if (id == "root") {
      this.fileService.getFiles(id).then((res) => {
        this.files = res;
        this.cd.detectChanges();
      })
    }
    if (this.files.length != 0 && this.files.find((elem) => elem.ID == id).IsTypeFolder) {
      this.fileService.getFiles(id).then((res) => {
        this.files = res;
        this.cd.detectChanges();
      })
    }
  }

  download(id: string): void {
    this.fileService.downloadFile(id);
  }
}
