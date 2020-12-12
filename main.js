function petListings() {
  return {
    isLoading: true,
    petList: [],
    selectedPetListState: 'Default',
    setPetListFilter(state) {
      this.selectedPetListState = state;


    },
    async getPetList() {
      const url = 'https://api.adoptapet.com/search/pet_search?key=e41b6bf1618d053c31d524d479c14b5t&geo_range=50&city_or_zip=91770&species=dog&output=json';
      this.isLoading = true;
      let response = await fetch(url);
      let petData = await response.json();
      await this.getPetDetails(petData.pets);
      this.petList = petData.pets;
      console.log({petData: JSON.parse(JSON.stringify(this.petList))});
      this.isLoading = false;
    },
    async getPetDetails(petList) {
      for (const pet of petList) {
        let response = await fetch(pet.details_url);
        let petDetailData = await response.json();
        pet.details = petDetailData.pet;
        pet.details.special_needs = 1;
      }
    }
  }
}

