import {Component, input, OnInit} from '@angular/core';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {CustomButtonComponent} from '../../shared/custom-button/custom-button.component';
import {Post} from '../../../shared/post.model';

@Component({
  selector: 'app-user-post-card',
  imports: [
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    CustomButtonComponent,
    MatExpansionPanelTitle
  ],
  templateUrl: './user-post-card.component.html',
  styleUrl: './user-post-card.component.scss'
})
export class UserPostCardComponent implements OnInit {

  post = input.required<Post>()

  ngOnInit(): void {
    console.log('user-post-card initialized');
  }
}
