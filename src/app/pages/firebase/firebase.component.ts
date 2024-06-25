import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { Firestore, collectionData, collection, doc, setDoc, deleteDoc, getDoc, query, where, getDocs, updateDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialsModule } from '../../core/shared/materials.module';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SafePipe } from '../../core/shared/safehtml.pipe';
import { RouterLink } from '@angular/router';


@Component({
    standalone: true,
    imports: [CommonModule, MaterialsModule, ReactiveFormsModule, SafePipe, RouterLink],
    templateUrl: './firebase.component.html',
    styleUrl: 'firebase.component.scss'
})
export class FireBaseComponent implements OnInit {
    items: any[] = [];
    firebaseFormGroup!: FormGroup;
    itemCollection: any;
    docDetails: any[] = [];
    contentEditable: boolean = false;
    selectedDoc: string | undefined;

    constructor(private firestore: Firestore, private fb: FormBuilder, private destroyRef: DestroyRef) {

        this.itemCollection = collection(firestore, 'todo');
        collectionData(this.itemCollection, { idField: 'id' })
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(
                (data: any) => this.items = [...data]
            );

    }

    ngOnInit() {
        this.firebaseFormGroup = this.fb.group({
            title: ['', Validators.required],
            description: ['']
        });

    }


    SubmitForm() {
        const form = this.firebaseFormGroup;

        if (form.status === 'VALID') {
            this.add(form.value);
        }

    }

    async add(val: any) {

        const newEntry = doc(this.itemCollection);
        await setDoc(newEntry, { description: val.description, title: val.title, date: new Date() });
    }

    async del(id: string) {

        const currentEnrty = doc(this.itemCollection, id);
        await deleteDoc(currentEnrty);
    }

    async getDocByID(docID: string) {

        const currentEnrty = doc(this.itemCollection, docID);
        const snap = await getDoc(currentEnrty);

        if (snap.exists()) {
            console.log(snap.data())
        }
        else {
            console.log("No such document")
        }
    }

    async getDocDetails(docID: string) {

        this.selectedDoc = docID;

        const q = query(collection(this.firestore, 'todo_details'), where("todo_id", "==", docID));

        const snapshot = await getDocs(q);

        this.docDetails.length = 0;
        snapshot.forEach((doc: any) => {
            let data = doc.data();
            data['docId'] = doc.id;
            this.docDetails.push(data);
        });

    }

    async updateDocDetails(docID: string) {
        const details = document.getElementById(docID)?.innerHTML.trim();

        const currentEnrty = doc(collection(this.firestore, 'todo_details'), docID);


        await updateDoc(currentEnrty, { details: details });
        this.contentEditable = false;
    }

    async setDocDetails(docID: string) {
        const details = document.getElementById(docID)?.innerHTML.trim();

        if (details != null && details != '') {
            const newEntry = doc(collection(this.firestore, 'todo_details'));
            await setDoc(newEntry, { details: details, todo_id: docID });
        }
    }

}


