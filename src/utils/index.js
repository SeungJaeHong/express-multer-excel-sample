const toRoleByName = (roleName) => {
  switch (roleName) {
    case '슈퍼관리자':
      return 'SUPER_POWER';

    case '세무대리인':
      return 'AGENT';

    case '카드관리자':
      return 'ADMINISTRATOR';

    default:
      return 'NO_POWER';
  }
};

const trimString = (value) => {
  return (value || '').trim();
};

const toMemberModel = (member) => {
  return {
    name: trimString(member.name),
    email: trimString(member.email),
    team: trimString(member.team),
    job: trimString(member.job),
    role: toRoleByName(trimString(member.role)),
  };
};

module.exports = {
  trimString,
  toMemberModel,
};
