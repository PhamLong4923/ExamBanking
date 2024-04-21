using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ExamBanking.Models
{
    public partial class ExamBankingContext : DbContext
    {
        public ExamBankingContext()
        {
        }

        public ExamBankingContext(DbContextOptions<ExamBankingContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Access> Accesses { get; set; } = null!;
        public virtual DbSet<Account> Accounts { get; set; } = null!;
        public virtual DbSet<Answer> Answers { get; set; } = null!;
        public virtual DbSet<Bank> Banks { get; set; } = null!;
        public virtual DbSet<Mode> Modes { get; set; } = null!;
        public virtual DbSet<Payment> Payments { get; set; } = null!;
        public virtual DbSet<Question> Questions { get; set; } = null!;
        public virtual DbSet<Repo> Repos { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<Section> Sections { get; set; } = null!;
        public virtual DbSet<Ticket> Tickets { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("server=PHAM_LONG; database=ExamBanking;uid=sa;pwd=123;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Access>(entity =>
            {
                entity.ToTable("Access");

                entity.Property(e => e.Accessid).HasColumnName("accessid");

                entity.Property(e => e.Bankid).HasColumnName("bankid");

                entity.Property(e => e.Fromid)
                    .HasColumnType("decimal(38, 0)")
                    .HasColumnName("fromid");

                entity.Property(e => e.Message)
                    .HasMaxLength(1)
                    .HasColumnName("message");

                entity.Property(e => e.Status).HasColumnName("status");

                entity.Property(e => e.Toid)
                    .HasColumnType("decimal(38, 0)")
                    .HasColumnName("toid");

                entity.HasOne(d => d.Bank)
                    .WithMany(p => p.Accesses)
                    .HasForeignKey(d => d.Bankid)
                    .HasConstraintName("FK__Access__bankid__5535A963");

                entity.HasOne(d => d.From)
                    .WithMany(p => p.AccessFroms)
                    .HasForeignKey(d => d.Fromid)
                    .HasConstraintName("FK__Access__fromid__534D60F1");

                entity.HasOne(d => d.To)
                    .WithMany(p => p.AccessTos)
                    .HasForeignKey(d => d.Toid)
                    .HasConstraintName("FK__Access__toid__5441852A");
            });

            modelBuilder.Entity<Account>(entity =>
            {
                entity.HasKey(e => e.Accid)
                    .HasName("PK__Account__A472ABF27A5F5076");

                entity.ToTable("Account");

                entity.Property(e => e.Accid)
                    .HasColumnType("decimal(38, 0)")
                    .ValueGeneratedOnAdd()
                    .HasColumnName("accid");

                entity.Property(e => e.Bankmode).HasColumnName("bankmode");

                entity.Property(e => e.Datejoin).HasColumnType("datetime");

                entity.Property(e => e.Isnewbie).HasColumnName("isnewbie");

                entity.Property(e => e.ResetTokenExpires).HasColumnType("datetime");

                entity.Property(e => e.Roleid).HasColumnName("roleid");

                entity.Property(e => e.Username)
                    .HasMaxLength(255)
                    .HasColumnName("username");

                entity.Property(e => e.Userpass)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("userpass");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Accounts)
                    .HasForeignKey(d => d.Roleid)
                    .HasConstraintName("FK__Account__roleid__398D8EEE");
            });

            modelBuilder.Entity<Answer>(entity =>
            {
                entity.HasKey(e => e.Ansid)
                    .HasName("PK__Answer__2626EE58948DC645");

                entity.ToTable("Answer");

                entity.Property(e => e.Ansid).HasColumnName("ansid");

                entity.Property(e => e.Anscontent).HasColumnName("anscontent");

                entity.Property(e => e.Ansstatus).HasColumnName("ansstatus");

                entity.Property(e => e.Quesid).HasColumnName("quesid");

                entity.HasOne(d => d.Ques)
                    .WithMany(p => p.Answers)
                    .HasForeignKey(d => d.Quesid)
                    .HasConstraintName("FK__Answer__quesid__4D94879B");
            });

            modelBuilder.Entity<Bank>(entity =>
            {
                entity.ToTable("Bank");

                entity.Property(e => e.Bankid).HasColumnName("bankid");

                entity.Property(e => e.Accid)
                    .HasColumnType("decimal(38, 0)")
                    .HasColumnName("accid");

                entity.Property(e => e.Bankmode).HasColumnName("bankmode");

                entity.Property(e => e.Bankname)
                    .HasMaxLength(255)
                    .HasColumnName("bankname");

                entity.Property(e => e.Bankstatus).HasColumnName("bankstatus");

                entity.HasOne(d => d.Acc)
                    .WithMany(p => p.Banks)
                    .HasForeignKey(d => d.Accid)
                    .HasConstraintName("FK__Bank__accid__3C69FB99");
            });

            modelBuilder.Entity<Mode>(entity =>
            {
                entity.ToTable("Mode");

                entity.Property(e => e.Modeid).HasColumnName("modeid");

                entity.Property(e => e.Qmode)
                    .HasMaxLength(100)
                    .HasColumnName("qmode");
            });

            modelBuilder.Entity<Payment>(entity =>
            {
                entity.HasKey(e => e.Payid)
                    .HasName("PK__Payment__082D8EEB2C139663");

                entity.ToTable("Payment");

                entity.Property(e => e.Payid).HasColumnName("payid");

                entity.Property(e => e.Accid)
                    .HasColumnType("decimal(38, 0)")
                    .HasColumnName("accid");

                entity.Property(e => e.Money).HasColumnName("money");

                entity.Property(e => e.Paycontent).HasColumnName("paycontent");

                entity.Property(e => e.Paydate)
                    .HasColumnType("date")
                    .HasColumnName("paydate");

                entity.Property(e => e.Status).HasColumnName("status");

                entity.HasOne(d => d.Acc)
                    .WithMany(p => p.Payments)
                    .HasForeignKey(d => d.Accid)
                    .HasConstraintName("FK__Payment__accid__5070F446");
            });

            modelBuilder.Entity<Question>(entity =>
            {
                entity.HasKey(e => e.Quesid)
                    .HasName("PK__Question__8FF5F51DD5B35B6B");

                entity.ToTable("Question");

                entity.Property(e => e.Quesid).HasColumnName("quesid");

                entity.Property(e => e.Modeid).HasColumnName("modeid");

                entity.Property(e => e.Quescontent).HasColumnName("quescontent");

                entity.Property(e => e.Secid).HasColumnName("secid");

                entity.Property(e => e.Solution).HasColumnName("solution");

                entity.Property(e => e.Type).HasColumnName("type");

                entity.HasOne(d => d.Mode)
                    .WithMany(p => p.Questions)
                    .HasForeignKey(d => d.Modeid)
                    .HasConstraintName("FK__Question__modeid__49C3F6B7");

                entity.HasOne(d => d.Sec)
                    .WithMany(p => p.Questions)
                    .HasForeignKey(d => d.Secid)
                    .HasConstraintName("FK__Question__secid__4AB81AF0");
            });

            modelBuilder.Entity<Repo>(entity =>
            {
                entity.ToTable("Repo");

                entity.Property(e => e.Repoid).HasColumnName("repoid");

                entity.Property(e => e.Bankid).HasColumnName("bankid");

                entity.Property(e => e.Reponame)
                    .HasMaxLength(100)
                    .HasColumnName("reponame");

                entity.HasOne(d => d.Bank)
                    .WithMany(p => p.Repos)
                    .HasForeignKey(d => d.Bankid)
                    .HasConstraintName("FK__Repos__bankid__412EB0B6");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("Role");

                entity.Property(e => e.Roleid).HasColumnName("roleid");

                entity.Property(e => e.Role1)
                    .HasMaxLength(255)
                    .HasColumnName("role");
            });

            modelBuilder.Entity<Section>(entity =>
            {
                entity.HasKey(e => e.Secid)
                    .HasName("PK__Section__C25197F02FBCA38D");

                entity.ToTable("Section");

                entity.Property(e => e.Secid).HasColumnName("secid");

                entity.Property(e => e.Repoid).HasColumnName("repoid");

                entity.Property(e => e.Secname)
                    .HasMaxLength(100)
                    .HasColumnName("secname");

                entity.HasOne(d => d.Repo)
                    .WithMany(p => p.Sections)
                    .HasForeignKey(d => d.Repoid)
                    .HasConstraintName("FK__Section__repoid__46E78A0C");
            });

            modelBuilder.Entity<Ticket>(entity =>
            {
                entity.ToTable("Ticket");

                entity.Property(e => e.Ticketid).HasColumnName("ticketid");

                entity.Property(e => e.Accid)
                    .HasColumnType("decimal(38, 0)")
                    .HasColumnName("accid");

                entity.Property(e => e.Bankid).HasColumnName("bankid");

                entity.Property(e => e.Expire).HasColumnName("expire");

                entity.Property(e => e.Startdate)
                    .HasColumnType("datetime")
                    .HasColumnName("startdate");

                entity.Property(e => e.Ticketmode).HasColumnName("ticketmode");

                entity.Property(e => e.Ticketname)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("ticketname");

                entity.HasOne(d => d.Acc)
                    .WithMany(p => p.Tickets)
                    .HasForeignKey(d => d.Accid)
                    .HasConstraintName("FK__Ticket__accid__5812160E");

                entity.HasOne(d => d.Bank)
                    .WithMany(p => p.Tickets)
                    .HasForeignKey(d => d.Bankid)
                    .HasConstraintName("FK__Ticket__bankid__59063A47");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
