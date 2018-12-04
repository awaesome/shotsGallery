const imgCard = document.querySelector('.img-card')

export default function populateShot(project) {
  const {
    name: shotName,
    fields,
    covers: { original },
    owners: [{
      images: { 50: userImg },
      display_name: userName
    }],
    stats: {
      views,
      appreciations
    }
  } = project

  imgCard.innerHTML = `
    <div class="img-card__header">
      <div class="img-card__header__profile">
        <img src="${userImg}" alt="profile">
        <span>${userName}</span>
      </div>
      <span class="img-card__header__img-name">${shotName}</span>
      <div class="img-card__header__stats">
        <span class="badge badge-danger"><i class="far fa-heart"></i> ${appreciations}</span>
        <span class="badge badge-warning"><i class="far fa-eye"></i> ${views}</span>
      </div>
    </div>
    <div class="img-card__container-img">
      <img class="img-card__container-img__img" src="${original}" alt="did not find sry T_T">
    </div>
    <div class="img-card__footer">
      <span class="header-menu__tags-title">Tags |</span>
      <ul class="tags">
        ${fields.map(field => '<li class="tags__tag tags__tag--dark">'+field+'</li>')}
      </ul>
      <span>Esc </span>
      <i class="far fa-window-close"></i>
    </div>
  `
}