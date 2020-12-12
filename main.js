function petListings() {
  return {
    selectedPetListState: 'Default',
    setPetListFilter(state) {
      this.selectedPetListState = state;
    }
  }
}
