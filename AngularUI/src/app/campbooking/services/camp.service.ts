import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Camp} from '../models/camp.interface';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class CampService{
  url = 'http://localhost:53056/api/Camp';

  constructor(private http: HttpClient) {}


  async getAllFilteredCamps(checkIn: Date , checkOut: Date , capacity: number)
  {
    const params = new HttpParams().set('checkIn', checkIn.toString())
                                   .set('checkOut', checkOut.toString())
                                   .set('capacity', capacity.toString());


    return this.http.get<Camp[]>(this.url, {params});

  }
  // async postNewCamp(campForm: FormGroup , imageToUpload: File)
  // {
  //   const formData: FormData = new FormData();
  //   Object.entries(campForm.value).forEach(
  //     ([key, value]: any[]) => {
  //       formData.set(key, value);
  //     }
  //   );
  //   formData.append('image', imageToUpload, imageToUpload.name);
  //   return this.http.post(this.url, formData);
  // }
  async postNewCamp(camp:Camp)
  {
    return this.http.post(this.url , camp , {headers: new HttpHeaders({
      'Authorization':'Bearer '+localStorage.getItem('userToken')
  })});
  }
  async getAllCamps()
  {
    return this.http.get<Camp[]>(this.url);
  }

  async getCampById(campId)
  {
    return this.http.get<Camp>(this.url + `/GetSelectedCamp/${campId}`);
  }
  async deleteCampById(campId)
  {
    return this.http.delete(this.url + `/DeleteSelectedCamp/${campId}` , {headers: new HttpHeaders({
      'Authorization':'Bearer '+localStorage.getItem('userToken')
  })});
  }
  async putCampById(campId , camp)
  {
    return this.http.put(this.url + `/${campId}`,camp,{headers: new HttpHeaders({
      'Authorization':'Bearer '+localStorage.getItem('userToken')
  })});
  }


}
