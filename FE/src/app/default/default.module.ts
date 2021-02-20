import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { LandingComponent } from './landing/landing.component';
import { DefaultRoutingModule } from './default-routing.module';

@NgModule({
  declarations: [DefaultComponent, LandingComponent],
  imports: [DefaultRoutingModule, CommonModule],
})
export class DefaultModule {}
