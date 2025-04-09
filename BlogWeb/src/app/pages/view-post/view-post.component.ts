import { Component, OnInit } from '@angular/core';   // ✅ import OnInit
import { PostService } from '../../service/post.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../../service/comment.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent implements OnInit {   // ✅ implements OnInit

  postId: any;     // ✅ just declare here
  postData: any;
  comments:any;

  commentForm!:FormGroup;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private matSnackBar: MatSnackBar,
    private fb:FormBuilder,
    private commentService:CommentService,
  ) {}

  ngOnInit() {
    // ✅ Now activatedRoute is available inside ngOnInit
    this.postId = this.activatedRoute.snapshot.params['id'];
    console.log(this.postId);
    this.getPostById();
    // You can now call API
    // this.getPostById();


    this.commentForm = this.fb.group({
      postedBy:[null,Validators.required],
      content:[null,Validators.required]
    })
  }

  publishComment(){
    const postedBy=this.commentForm.get('postedBy')?.value;
    const content=this.commentForm.get('content')?.value;

    this.commentService.createComment(this.postId,postedBy,content).subscribe(
    res=>{
       this.matSnackBar.open("Comment Published Successfully","ok");
       this.getCommentsByPost();
    },error=>{
      this.matSnackBar.open("Something Went Wrong!!!","ok")
    })
  }

  getCommentsByPost(){
    this.commentService.getAllcommentsByPost(this.postId).subscribe(
      res=>{
            this.comments = res;
    },error=>{
      this.matSnackBar.open("Something Went Wrong!!!","ok")
    })
  }

  getPostById() {
    this.postService.getPostById(this.postId).subscribe(
      res => {
        this.postData = res;
        console.log(res);
        this.getCommentsByPost();
      },error => {
        this.matSnackBar.open("Something Went Wrong!!!", "OK");
      }
    )}

    likePost(){
      this.postService.likePost(this.postId).subscribe(
        (response) => {
          this.matSnackBar.open("Post Liked Successfully", "OK");
          this.getPostById();
        },error => {
          this.matSnackBar.open("Something Went Wrong!!!", "OK");
        }


      )
    }
}
