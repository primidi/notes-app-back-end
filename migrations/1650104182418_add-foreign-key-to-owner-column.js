/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  // Create new user
  pgm.sql("INSERT INTO users(id, username, password, fullname) VALUES ('old_notes', 'old_notes', 'old_notes', 'old notes')");

  // Update the null value in owner's column of note's that doesn't have owner
  pgm.sql("UPDATE notes SET owner = 'old_notes' WHERE owner = NULL");

  // Give foreign key's constraint in owner's column towards id's of users table
  pgm.addConstraint('notes', 'fk_notes.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  // Delete the constraint fk_notes.owner_users.id in notes table
  pgm.dropConstraint('notes', 'fk_notes.owner_user.id');

  // Modify owner's old_notes value in note record to be NULL
  pgm.sql("UPDATE notes SET owner = NULL WHERE owner = 'old_notes'");

  // Delete new user
  pgm.sql("DELETE FROM users WHERE id = 'old_notes'");
};
