function petListings() {
  return {
    isLoading: true,
    isFiltering: false,
    petList: [],
    petListFiltered: [],
    selectedPetListState: 'Default',
    setPetListFilter(state) {
      this.selectedPetListState = state;

      this.filterPetList();
    },
    async getPetList() {
      const url = 'https://api.adoptapet.com/search/pet_search?key=e41b6bf1618d053c31d524d479c14b5t&geo_range=50&city_or_zip=91770&species=dog&output=json';
      this.isLoading = true;
      let response = await fetch(url);
      let petData = await response.json();
      await this.getPetDetails(petData.pets);
      this.petList = petData.pets;
      this.addMockData();
      this.filterPetList();
      this.isLoading = false;
    },
    async getPetDetails(petList) {
      for (const pet of petList) {
        let response = await fetch(pet.details_url);
        let petDetailData = await response.json();
        pet.details = petDetailData.pet;
        pet.isMarkedFavorite = false;
        pet.isShowMoreInfo = false;
      }
    },
    filterPetList() {
      this.isFiltering = true;

      switch (this.selectedPetListState) {
        case 'Default':
          this.petListFiltered = this.petList;
          break;
        case 'Act Quickly':
          this.petListFiltered = this.petList.filter(pet => pet.details.act_quickly === 1);
          break;
        case 'Special Needs':
          this.petListFiltered = this.petList.filter(pet => pet.details.special_needs === 1);
          break;
        case 'Adopted':
          this.petListFiltered = this.petList.filter(pet => pet.details.adopted === 1);
          break;
      }

      this.isFiltering = false;
    },
    addMockData() {
      for (let i = 0; i < this.petList.length; i += 3) {
        if (this.petList[i].details.act_quickly === 0) {
          this.petList[i].details.adopted = 1;
          this.petList[i].details.bonded_pair = 1;
        }
      }
    }
  }
}

