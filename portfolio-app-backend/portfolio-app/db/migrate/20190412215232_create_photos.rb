class CreatePhotos < ActiveRecord::Migration[5.2]

  def change
    create_table :photos do |t|
      t.text :caption
      t.belongs_to :user, foreign_key: true
      t.references :commenters, index: true
      t.references :likers, index: true
      t.timestamps
    end
  end

end
