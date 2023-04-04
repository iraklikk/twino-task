import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {Person} from "../../entities/person";
import {PersonsService} from "../../services/persons.service";

@Component({
  selector: 'twn-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent implements OnInit{

  person?: Person;
  constructor(private route: ActivatedRoute,
              private personsService: PersonsService) {
  }

  ngOnInit() {
    this.person = this.personsService.persons.find(person => person.id === +this.route.snapshot.params['id']);
  }
}
