import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FileManipulationService } from 'src/app/services/file-manipulation.service';
import { Observable } from 'rxjs';
import { FileSpecs } from 'src/app/models/fileSpecs';

@Component({
  selector: 'app-drive-contents',
  templateUrl: './drive-contents.component.html',
  styleUrls: ['./drive-contents.component.css']
})
export class DriveContentsComponent implements OnInit {

  files: Observable<FileSpecs[]>;
  constructor(private fileService: FileManipulationService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.fileService.getFiles("root")
      .then((res) => {
        this.files = res;
        this.cd.detectChanges();
      })
  }


}
