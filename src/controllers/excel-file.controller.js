const readXlsxFile = require('read-excel-file/node');
const { Readable } = require('stream');
const { trimString, toMemberModel } = require('../utils');

const readMembersFromExcelFile = async (req, res) => {
  try {
    readXlsxFile(Readable.from(req.file.buffer)).then((rows) => {
      // 헤더 삭제
      rows.shift();
      // 제공된 시트에서 멤버 데이터가 시작되는 행 위치부터 파싱
      rows = rows.slice(3);

      // 0, 1번째 셀은 시트에서 공란
      const validMembers = rows.reduce((members, member) => {
        const [_, __, name, email, team, job, role] = member;
        // 혹시 모를 공백 입력으로 인한 오동작 방지
        if (trimString(name) && trimString(email)) {
          return members.concat(
            toMemberModel({ name, email, team, job, role })
          );
        } else {
          return members;
        }
      }, []);

      res.status(200).send({
        members: validMembers,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message,
    });
  }
};

module.exports = {
  readMembersFromExcelFile,
};
